/* eslint-disable no-unused-vars */
import React from 'react';
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { GrFormAdd } from 'react-icons/gr';
import PageButton from './PageButton';
import { useStateContext } from '../contexts/ContextProvider';

// const { currentColor } = useStateContext();

const QueriesHeader = ({ category, title }) => {
  const { currentColor } = useStateContext();
  return (
    <div className=" mb-10">
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
      <PageButton
        // icon={<GrFormAdd />}
        color="white"
        bgColor={currentColor}
        text="Create Request"
        borderRadius="10px"
        width="5"
        // alignment="float:right"
      />
    </div>
  );
};

export default QueriesHeader;
