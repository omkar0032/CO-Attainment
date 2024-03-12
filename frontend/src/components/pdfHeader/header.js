import React from 'react';
import './header.css';

const DefaultHeader = ({ academicYear, department, eYear, subject, sem }) => {
    return (
      

        <div className='default-header center'>
            <p className='header-heading center'>Final CO PO Attainment For {academicYear}</p>
            <div className='default-header center'>
                <p className='college-name'>PUNE INSTITUTE OF COMPUTER TECHNOLOGY, PUNE-411043</p>
            </div>
            <img src='./pict.jpg' alt='PICT' className='image'></img>
            <p className='dept center'>Department Of {department}</p>
            <p className='center'>S.No-27, Pune Satara Road, Dhankawadi, Pune-411043</p>
            <p className='center'>INTERNAL ASSESSMENT SHEET</p>
            <p className='left-side'>Subject: {subject}</p>
            <p className='center'>Year & Sem: {academicYear},{sem}</p>
            <p className='left-side'>Class: {eYear}</p>

        </div>
    );
};

export default DefaultHeader;
