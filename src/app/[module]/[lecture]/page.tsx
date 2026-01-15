import type { LectureContract } from '@/core/contracts/LectureContract';
import { loadConcept, loadLecture, type LoadedConcept } from '@/core/loaders';
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

    const lectureData: LectureContract = await loadLecture(lectureDir);

    const [overviewMarkdown, synthesisMarkdown] = await Promise.all([
        readFile(resolve(lectureDir, lectureData.overviewPath), 'utf-8'),
        readFile(resolve(lectureDir, lectureData.synthesisPath), 'utf-8'),
    ]);

    const concepts: LoadedConcept[] = await Promise.all(
        lectureData.concepts.map((conceptId) =>
            loadConcept(resolve(contentRoot, module, 'concepts', conceptId))
        )
    );

    return (
        <LectureClient
            lecture={lectureData}
            concepts={concepts}
            overviewMarkdown={overviewMarkdown}
            synthesisMarkdown={synthesisMarkdown}
        />
    );
}
