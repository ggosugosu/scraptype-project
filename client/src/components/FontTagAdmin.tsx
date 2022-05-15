import React from "react";
import CreateFontTag from "../features/CreateFontTag";
import FontTable from "../features/FontTable";
import FontTagTable from "../features/FontTagTable";

function FontTagAdmin () {
    return (
        <div>
            <CreateFontTag />
            <div>
                <FontTagTable />
                <FontTable />
            </div>
        </div>
        
    );
}

export default FontTagAdmin;