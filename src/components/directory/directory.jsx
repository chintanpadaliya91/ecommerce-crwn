import React from 'react'
import { connect } from 'react-redux'
import { selectDirectorySections } from "../../reducers/directory/directory.selectors";

import { createStructuredSelector } from "reselect";

import './directory.styles.scss'
import MenuItem from "../menu-item/menu-item.component";

const Directory = ({ sections }) => (
  <div className='directory-menu'>
    { sections.map(({id, ...otherSectionPros}) => (<MenuItem key={id} {...otherSectionPros}/>)) }
  </div>
)

const mapStateToProps =  createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)