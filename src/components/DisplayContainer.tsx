import React, { useEffect, useState } from 'react';

interface DisplayContainerProps {
    data: any;
    onNextPage: Function;
}

const DisplayContainer = ({ data, onNextPage }: DisplayContainerProps) => {
    return (
        <div className="DisplayContainer">
            <ul>
                {data.map(ele => (
                    <li key={`${ele.id}_${ele.secret}_${ele.servet}_${ele.farm}`}>
                        <img src={ele.url} title={ele.title} />
                    </li>
                )
                )}
                {
                    data.length>0&&(
                        <button onClick={() => {
                            onNextPage();
                        }}>Show more</button>
                    )
                }
            </ul>
        </div>
    )
}

export default DisplayContainer;
