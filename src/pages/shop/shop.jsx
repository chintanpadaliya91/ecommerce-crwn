import React from 'react'

import SHOP_DATA from "./shopData";
import PreviewCollectionComponent from "../../components/preview-collection/preview-collection.component";

class shop extends React.Component {
  constructor() {
    super()
    this.state = {
      collections: SHOP_DATA
    }
  }

  render() {
    const { collections } = this.state
    return (
      <div className='shop-page'>
        {
          collections.map(({ id, ...otherCollectionProps }) => (
            <PreviewCollectionComponent key={id} {...otherCollectionProps} />
          ))
        }
      </div>
    )
  }
}

export default shop