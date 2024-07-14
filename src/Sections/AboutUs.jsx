import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LuArrowLeftCircle, LuArrowRightCircle } from "react-icons/lu";
import amanda from '../assets/Profile/amanda.png'
import hary from '../assets/Profile/hary.svg'
import robert from '../assets/Profile/Robert.png'

const AboutUsContainer = styled.div`
  padding: 72px 70px;
  width: 100%;
  height: 592px;
  flex-shrink: 0;
  background: var(--Neutral-Grey-50, #f5f6f6);
`;

const AboutUsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--Neutral-Grey-500, #6b6d6f);

  /* Headings/Small/Regular */
  font-family: "Be Vietnam Pro";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.44px;
`;

const IconContainer = styled.div`
  font-size: 40px;
`;

const Title = styled.h1`
  margin: 0px;
  color: var(--Neutral-Grey-900, #3c3d3d);
  font-family: "Be Vietnam Pro";
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.48px;
`;

const TestimonialCards = styled.div`
width:100%;
  display: flex;
  gap: 32px;
  overflow: auto; /* Allow horizontal scrolling */
  padding-bottom: 16px; /* Add some padding to make the scrolling smooth */
  box-sizing: border-box;
  overflow-wrap: break-word;
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

`;

const Testimonial = styled.div`
  display: inline-flex; 
  padding: 40px 32px 48px 32px;
  flex-wrap:wrap;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 12px;
  background: var(--Neutral-White, #fff);
  width: 592px; /* Set a fixed width for each card */
  box-sizing: border-box;
  overflow-wrap: break-word;
`;

const Review = styled.p`
width:528px;
  color: var(--Neutral-Grey-900, #3C3D3D);
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
`;

const Profile= styled.div`
display: flex;
align-items: center;
gap: 17px;`
const Name = styled.div`
color: var(--Neutral-Grey-900, #3C3D3D);

/* Title/Large/Semibold */
font-family: "Be Vietnam Pro";
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 133.333% */`

const Position = styled.div`
color: var(--Neutral-Grey-400, #86888A);

/* Title/Small/Regular */
font-family: "Be Vietnam Pro";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */`

const testimonials = [
  {
    id: 1,
    author: "Amanda Bell",
    testimonial:
      "This job portal has been instrumental in advancing my career. The  interface is intuitive, making it easy to navigate through job listings  and application processes. I've received numerous interview requests and job offers through this portal. I highly recommend it to anyone seeking new  career opportunities.",
    profile: amanda,
    position: "Product Designer",
  },
  {
    id: 2,
    author: "Robert Smith",
    testimonial:
      "This job portal has been instrumental in advancing my career. The  interface is intuitive, making it easy to navigate through job listings  and application processes. I've received numerous interview requests and job offers through this portal. I highly recommend it to anyone seeking new  career opportunities.",
    profile: robert,
    position: "HR Manager",
  },
  {
    id: 3,
    author: "Amanda Bell",
    testimonial:
      "This job portal has been instrumental in advancing my career. The  interface is intuitive, making it easy to navigate through job listings  and application processes. I've received numerous interview requests and job offers through this portal. I highly recommend it to anyone seeking new  career opportunities.",
    profile: hary,
    position: "Product Designer",
  },
  {
    id: 4,
    author: "Amanda Bell",
    testimonial:
      "This job portal has been instrumental in advancing my career. The  interface is intuitive, making it easy to navigate through job listings  and application processes. I've received numerous interview requests and job offers through this portal. I highly recommend it to anyone seeking new  career opportunities.",
    profile: amanda,
    position: "Product Designer",
  },
];

function AboutUs() {
    const [currentCard, setCurrentCard] = useState(2);
  const cardsRef = useRef(null);

  const handleScroll = () => {
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0].clientWidth + 32; 
      const scrollLeft = cardsRef.current.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth) + 1;
      setCurrentCard(index + 1);
    }
  };

  useEffect(() => {
    const container = cardsRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []); 

  const scrollLeft = () => {
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0].clientWidth + 32; // Width of one card plus the gap
      cardsRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.children[0].clientWidth + 32; // Width of one card plus the gap
      cardsRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <AboutUsContainer id="aboutUs">
      <AboutUsHeader>
        <Title>
          What our client say about{" "}
          <span className="text-[#01A3E0]">Pacific Hunt</span>
        </Title>
        <Pagination>
  <IconContainer onClick={scrollLeft}>
    <LuArrowLeftCircle />
  </IconContainer>
  <div className="page">
    <span className="text-[#01A3E0]">{currentCard}</span>/{testimonials.length}
  </div>
  <IconContainer onClick={scrollRight}>
    <LuArrowRightCircle />
  </IconContainer>
</Pagination>

      </AboutUsHeader>
      <TestimonialCards ref={cardsRef}>
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="24"
              viewBox="0 0 29 24"
              fill="none"
            >
              <path
                d="M13.0756 0L7.08564 10.7016C8.74139 10.8066 10.105 11.5148 11.1763 12.8262C12.2964 14.0852 12.8564 15.6066 12.8564 17.3902C12.8564 19.2787 12.2477 20.8525 11.0302 22.1115C9.81276 23.3705 8.30311 24 6.50126 24C4.69941 24 3.16541 23.3705 1.89924 22.1115C0.633081 20.8525 0 19.1475 0 16.9967C0 15.8426 0.267842 14.5574 0.803526 13.141C1.33921 11.7246 2.19144 10.0459 3.3602 8.10492C4.57767 6.11147 6.13602 3.69836 8.03526 0.865572L8.5466 0H13.0756ZM29 0L22.937 10.7016C24.6415 10.8066 26.0294 11.5148 27.1008 12.8262C28.1721 14.0852 28.7078 15.6066 28.7078 17.3902C28.7078 19.2787 28.0991 20.8525 26.8816 22.1115C25.7128 23.3705 24.2275 24 22.4257 24C20.5751 24 19.0168 23.3705 17.7506 22.1115C16.5332 20.8525 15.9244 19.1475 15.9244 16.9967C15.9244 15.8426 16.1923 14.5574 16.728 13.141C17.2636 11.7246 18.1159 10.0459 19.2846 8.10492C20.4534 6.11147 21.9874 3.69836 23.8867 0.865572L24.471 0H29Z"
                fill="#D0D1D1"
              />
            </svg>
            <Review>{testimonial.testimonial}</Review>
            <Profile>
                <img src={testimonial.profile} alt={testimonial.author} />
                <div className="nameandposition">
                    <Name>{testimonial.author}</Name>
                    <Position>{testimonial.position}</Position>
                </div>
            </Profile>
          </Testimonial>
        ))}
      </TestimonialCards>
    </AboutUsContainer>
  );
}

export default AboutUs;
