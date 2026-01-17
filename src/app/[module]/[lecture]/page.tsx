import type { LectureContract } from '@/core/contracts/LectureContract';
import { loadConcept, loadLecture, type LoadedConcept } from '@/core/loaders';
import { notFound } from 'next/navigation';
import LectureClient from './LectureClient';

import { readFile } from 'fs/promises';
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

    let lectureData: LectureContract;
    try {
        lectureData = await loadLecture(lectureDir);
    } catch (e) {
        console.error('Failed to load lecture data:', e);
        // Lecture directory doesn't exist or is malformed
        notFound();
    }

    let overviewMarkdown: string;
    let synthesisMarkdown: string;
    try {
        [overviewMarkdown, synthesisMarkdown] = await Promise.all([
            readFile(resolve(lectureDir, lectureData.overviewPath), 'utf-8'),
            readFile(resolve(lectureDir, lectureData.synthesisPath), 'utf-8'),
        ]);
    } catch (e) {
        console.error('Failed to load markdown files:', e);
        notFound();
    }

    let concepts: LoadedConcept[];
    try {
        concepts = await Promise.all(
            lectureData.concepts.map((conceptId) =>
                loadConcept(resolve(contentRoot, module, 'concepts', conceptId))
            )
        );
    } catch (e) {
        console.error('Failed to load concepts:', e);
        notFound();
    }

    return (
        <LectureClient
            lecture={lectureData}
            concepts={concepts}
            overviewMarkdown={overviewMarkdown}
            synthesisMarkdown={synthesisMarkdown}
        />
    );
}

