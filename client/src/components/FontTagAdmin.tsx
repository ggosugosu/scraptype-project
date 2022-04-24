import React from "react";
import CreateFontTag from "../features/CreateFontTag";
import FontTagTable from "../features/FontTagTable";

function FontTagAdmin () {
    return (
        <div>
            <CreateFontTag />
            <div>
                <FontTagTable />
            </div>
        </div>
        
    );
}

export default FontTagAdmin;