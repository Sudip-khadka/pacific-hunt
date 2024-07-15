import React from 'react'
import styled from 'styled-components'
import BackButton from '../Components/BackButton'
import Buttons from '../Components/Buttons'

const CategoryHeader = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
color: var(--Neutral-White, #FFF);
text-align: center;

/* Title/Medium/Medium */
font-family: "Be Vietnam Pro";
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 150% */
`
const OtherButtons = styled.div`
display: flex;
align-items: flex-start;
gap: 16px;`
function Category() {
  return (
    <>
    <CategoryHeader>
      <BackButton title="Categories"/>
      <OtherButtons>
        <Buttons width="257px" title="Download .xlsx Sample" type="download" />
        <Buttons title="Import .xlsx File " type="upload" />
        <Buttons title="Import .xlsx File " type="create" />
      </OtherButtons>
    </CategoryHeader>
    </>
  )
}

export default Category
