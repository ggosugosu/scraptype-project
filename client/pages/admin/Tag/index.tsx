import PageTitle from 'components/PageTitle';
import FontOverview from "features/Admin/Font/Overview";
import { useRouter } from 'next/router';
import React from 'react';


export default function TagPage() {
    const router = useRouter();

    return (
        <>
            <PageTitle title="Font Setting" onClick={() => router.push('/')} />
            <FontOverview />
        </>
    )
}
