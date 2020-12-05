import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector} from "reselect";

import './collections-overview.styles.scss'
import PreviewCollectionComponent from "../preview-collection/preview-collection.component";
import { selectCollectionsForPreview } from "../../reducers/shop/shop.selectors";

const CollectionsOverview = ({collections}) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
    <PreviewCollectionComponent key={id} {...otherCollectionProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)