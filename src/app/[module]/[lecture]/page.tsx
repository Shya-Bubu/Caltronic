import type { LectureContract } from '@/core/contracts/LectureContract';
import { 
    safeLoadLecture, 
    safeLoadConcepts, 
    safeReadMarkdown,
    PLACEHOLDER_CONTENT,
    type LoadedConcept 
} from '@/core/loaders';
import { notFound } from 'next/navigation';
import LectureClient from './LectureClient';
import LectureError from './LectureError';

import { resolve } from 'path';

interface LecturePageProps {
    params: Promise<{
        module: string;
        lecture: string;
    }>;
}

export default async function LecturePage({ params }: LecturePageProps) {
    const { module, lecture } = await params;

    const contentRoot = resolve(process.cwd(), 'src', 'content');
    const lectureDir = resolve(contentRoot, module, 'lessons', lecture);

    // Safely load lecture metadata
    const lectureResult = await safeLoadLecture(lectureDir);
    
    if (!lectureResult.success || !lectureResult.data) {
        // If lecture doesn't exist at all, show 404
        if (lectureResult.errorType === 'not-found') {
            notFound();
        }
        // For other errors, show error page instead of crashing
        return (
            <LectureError 
                title="Lesson Unavailable"
                message={lectureResult.error || 'This lesson could not be loaded.'}
                suggestion="The lesson content may be incomplete or under development."
            />
        );
    }

    const lectureData: LectureContract = lectureResult.data;

    // Safely load markdown files with fallbacks
    const [overviewMarkdown, synthesisMarkdown] = await Promise.all([
        safeReadMarkdown(
            resolve(lectureDir, lectureData.overviewPath),
            PLACEHOLDER_CONTENT.lecture.notFound
        ),
        safeReadMarkdown(
            resolve(lectureDir, lectureData.synthesisPath),
            PLACEHOLDER_CONTENT.lecture.notFound
        ),
    ]);

    // Safely load concepts with graceful handling of missing ones
    const { loaded: concepts, failed: failedConcepts } = await safeLoadConcepts(
        contentRoot,
        module,
        lectureData.concepts
    );

    // If ALL concepts failed to load, show error
    if (concepts.length === 0) {
        return (
            <LectureError 
                title="Concepts Unavailable"
                message="None of the concepts for this lesson could be loaded."
                suggestion="The concept content may be incomplete or under development."
                details={failedConcepts.map(f => `${f.id}: ${f.error}`)}
            />
        );
    }

    // Log warnings for partially failed concepts but continue
    if (failedConcepts.length > 0) {
        console.warn(`[LecturePage] Some concepts failed to load:`, failedConcepts);
    }

    return (
        <LectureClient
            lecture={lectureData}
            concepts={concepts}
            overviewMarkdown={overviewMarkdown}
            synthesisMarkdown={synthesisMarkdown}
            failedConcepts={failedConcepts}
        />
    );
}

