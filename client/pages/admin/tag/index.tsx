import PageTitle from 'components/PageTitle';
import {useRouter} from 'next/router';
import React from 'react';
import TagOverview from "../../../src/features/Admin/Tag/Overview";


export default function TagPage() {
    const router = useRouter();

    return (
        <>
            <PageTitle title="Font Setting" onClick={() => router.push('/')}/>
            <TagOverview/>
        </>
    )
}
