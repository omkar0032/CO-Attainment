import React, { useState } from 'react';
// import FormComponent from './FormComponent';
import DataTable from './DataTable';
// import ExcelImporter from '../../backUp/ExcelImporter';

const ParentComponent = ({tableName}) => {
    return (
        
        <div>
            <DataTable tableName={tableName} />
        </div>
    );
};

export default ParentComponent;
