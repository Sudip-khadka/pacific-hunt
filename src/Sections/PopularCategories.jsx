import React from 'react';
import styled from 'styled-components';
import { FaArrowRightLong } from 'react-icons/fa6';
import { CiPen } from "react-icons/ci";
import { FaCode } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa";
import { PiFirstAidKitBold } from "react-icons/pi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { MdBarChart } from "react-icons/md";

const CategoriesContainer = styled.div`
  padding: 50px 70px 0px;
  width: 100%;
`;

const CategoriesHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin: 0px;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.48px;
`;

const SeeMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
  border-radius: 4px;
  color: var(--Primary-500, #01A3E0);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--Primary-100, #E0F7FA);
    color: var(--Primary-700, #007B9E);
  }

  p {
    margin: 0;
  }
`;

const CategoriesBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 32px;
`;

const CategoryCard = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid var(--Neutral-Grey-100, #E6E7E7);
  background: var(--Neutral-White, #FFF);
`;

const CategoryTitle = styled.div`
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
`;

const OpenPosition = styled.div`
  color: var(--Neutral-Grey-500, #6B6D6F);
  font-family: "Be Vietnam Pro";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  padding: 18px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  background: var(--Primary-100, #DEF3FF);
  color:#01A3E0;
  font-size: 24px;
`;

const categories = [
  { id: 1, title: "Graphics & Design", openPositions: 418, icon: <CiPen /> },
  { id: 2, title: "Coding & Programming", openPositions: 310, icon: <FaCode /> },
  { id: 3, title: "Data Science", openPositions: 276, icon: <FaDatabase /> },
  { id: 4, title: "Health Care", openPositions: 150, icon: <PiFirstAidKitBold /> },
  { id: 5, title: "Digital Marketing", openPositions: 530, icon: <HiOutlineMegaphone /> },
  { id: 6, title: "Accounting", openPositions: 94, icon: <MdBarChart /> },
];

function PopularCategories() {
  return (
    <CategoriesContainer id='categories'>
      <CategoriesHeader>
        <Title>Popular Categories</Title>
        <SeeMoreButton>
          <p>See More</p>
          <FaArrowRightLong />
        </SeeMoreButton>
      </CategoriesHeader>
      <CategoriesBody>
        {categories.map((category) => (
          <CategoryCard key={category.id}>
            <IconWrapper>{category.icon}</IconWrapper>
            <div className='category-text flex flex-col gap-2' >
              <CategoryTitle>{category.title}</CategoryTitle>
              <OpenPosition>{category.openPositions} Open positions</OpenPosition>
            </div>
          </CategoryCard>
        ))}
      </CategoriesBody>
    </CategoriesContainer>
  );
}

export default PopularCategories;
