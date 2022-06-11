import React from "react";
import CreateFontTag from "./CreateFontTag";
import FontTable from "../FontTable";
import FontTagTable from "../FontTagTable";

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