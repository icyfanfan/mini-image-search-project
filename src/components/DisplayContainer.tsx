import React from 'react';
import { Button } from 'antd';

interface DisplayContainerProps {
  data: any;
  onNextPage: Function;
}

const DisplayContainer = ({ data, onNextPage }: DisplayContainerProps) => {
  return (
    <div className="displayContainer">
      <ul>
        {data.map(ele => (
          <li key={`${ele.id}_${ele.secret}_${ele.servet}_${ele.farm}`}>
            <img src={ele.url} title={ele.title} />
          </li>
        )
        )}
        {
          data.length>0&&(
            <Button onClick={() => {
              onNextPage();
            }} className="container_button">Show more</Button>
          )
        }
      </ul>
    </div>
  )
}

export default DisplayContainer;
