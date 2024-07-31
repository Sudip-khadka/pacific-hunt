import React from "react";
import styled from "styled-components";
import logo from "../assets/logofooter.png";

const FooterContainer = styled.div`
  display: flex;
  height: 296px;
  padding: 64px 0px;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  align-self: stretch;
  background: var(--Neutral-Grey-950, #252527);
  @media (max-width: 786px) {
    padding: 30px;
    height: auto;
    gap: 15px;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 373px;
  height: 168px;
  @media (max-width: 786px) {
    flex-direction: column;
    height: auto;
    gap: 15px;
  }
`;
const Socials = styled.div`
  display: flex;
  padding: 48px 0px;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  align-self: stretch;
  background: var(--Neutral-Grey-950, #252527);
  .copywriteandsocials {
    padding: 0px 80px;
    display: flex;
    align-items: center;
    gap: 32px;
    align-self: stretch;
    color: var(--Neutral-Grey-300, #afb0b1);

    /* Title/Medium/Regular */
    font-family: "Be Vietnam Pro";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    @media(max-width:768px){
flex-direction:column;}
  }
  .copywriteandsocials > p {
    flex: 1 0 0;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;
  @media(max-width:450px){
  gap:20px;
flex-direction:column;}
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const NavTitle = styled.p`
  color: var(--Neutral-White, #fff);

  /* Title/Large/Medium */
  font-family: "Be Vietnam Pro";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
`;
const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const Links = styled.p`
  color: var(--Neutral-Grey-300, #afb0b1);

  /* Title/Medium/Regular */
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  &hover{
  cursor:pointer;}
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <div className="logoanddescription flex flex-col gap-6 w-full lg:w-[320px]">
          <img src={logo} alt="Pacific Hunt logo" width="189px" />
          <p className="text-[#AFB0B1] ">
            Lorem ipsum dolor sit amet consectetur. Nibh leo amet sed orci ipsum
            lectus pretium diam. Placerat ipsum volutpat commodo sodales.
          </p>
        </div>
        <NavigationContainer>
          <Navigation>
            <NavTitle>Job Seekers</NavTitle>
            <LinksWrapper>
              <Links>Search Jobs</Links>
              <Links>Explore Jobs</Links>
              <Links>Saved Jobs</Links>
              <Links>Applied Jobs</Links>
            </LinksWrapper>
          </Navigation>
          <Navigation>
            <NavTitle>Employers</NavTitle>
            <LinksWrapper>
              <Links>Register</Links>
              <Links>Post Jobs</Links>
              <Links>Applictions</Links>
              <Links>My Job Postings</Links>
            </LinksWrapper>
          </Navigation>
          <Navigation>
            <NavTitle>Legal</NavTitle>
            <LinksWrapper>
              <Links>Cookies Policy</Links>
              <Links>Privacy Policy</Links>
              <Links>Terms Of Service</Links>
            </LinksWrapper>
          </Navigation>
        </NavigationContainer>
      </FooterWrapper>
      <Socials>
        <div className="copywriteandsocials">
          <p>Copyright © 2024 Pacific Hunt. All rights reserved.</p>
          <div className="icons flex gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_2029_592)">
                <path
                  d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                  fill="#AFB0B1"
                />
              </g>
              <defs>
                <clipPath id="clip0_2029_592">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7.55016 21.75C16.6045 21.75 21.5583 14.2467 21.5583 7.74186C21.5583 7.53092 21.5536 7.3153 21.5442 7.10436C22.5079 6.40746 23.3395 5.54425 24 4.5553C23.1025 4.9546 22.1496 5.21538 21.1739 5.32874C22.2013 4.71291 22.9705 3.74547 23.3391 2.60577C22.3726 3.17856 21.3156 3.58261 20.2134 3.80061C19.4708 3.01156 18.489 2.48912 17.4197 2.31405C16.3504 2.13899 15.2532 2.32105 14.2977 2.8321C13.3423 3.34314 12.5818 4.15471 12.1338 5.14131C11.6859 6.12792 11.5754 7.23462 11.8195 8.2903C9.86249 8.19209 7.94794 7.6837 6.19998 6.7981C4.45203 5.91249 2.90969 4.66944 1.67297 3.14952C1.0444 4.23324 0.852057 5.51565 1.13503 6.73609C1.418 7.95654 2.15506 9.02345 3.19641 9.71999C2.41463 9.69517 1.64998 9.48468 0.965625 9.10592V9.16686C0.964925 10.3041 1.3581 11.4066 2.07831 12.2868C2.79852 13.167 3.80132 13.7706 4.91625 13.995C4.19206 14.1931 3.43198 14.222 2.69484 14.0794C3.00945 15.0574 3.62157 15.9129 4.44577 16.5263C5.26997 17.1398 6.26512 17.4806 7.29234 17.5012C5.54842 18.8711 3.39417 19.6141 1.17656 19.6106C0.783287 19.61 0.390399 19.5859 0 19.5384C2.25286 20.9837 4.87353 21.7514 7.55016 21.75Z"
                fill="#AFB0B1"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_2029_596)">
                <path
                  d="M23.5216 6.18541C23.3859 5.67482 23.1185 5.20883 22.7462 4.83407C22.3738 4.4593 21.9095 4.18891 21.3998 4.04996C19.5234 3.54541 12.0234 3.54541 12.0234 3.54541C12.0234 3.54541 4.52344 3.54541 2.64707 4.04996C2.13737 4.18891 1.6731 4.4593 1.30073 4.83407C0.928354 5.20883 0.660943 5.67482 0.525256 6.18541C0.0234376 8.06996 0.0234375 12 0.0234375 12C0.0234375 12 0.0234376 15.93 0.525256 17.8145C0.660943 18.3251 0.928354 18.7911 1.30073 19.1658C1.6731 19.5406 2.13737 19.811 2.64707 19.95C4.52344 20.4545 12.0234 20.4545 12.0234 20.4545C12.0234 20.4545 19.5234 20.4545 21.3998 19.95C21.9095 19.811 22.3738 19.5406 22.7462 19.1658C23.1185 18.7911 23.3859 18.3251 23.5216 17.8145C24.0234 15.93 24.0234 12 24.0234 12C24.0234 12 24.0234 8.06996 23.5216 6.18541Z"
                  fill="#AFB0B1"
                />
                <path
                  d="M9.56934 15.5687V8.4314L15.8421 12L9.56934 15.5687Z"
                  fill="#061447"
                />
              </g>
              <defs>
                <clipPath id="clip0_2029_596">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <a
              href="https://www.linkedin.com/in/sudip-khadka-21a769251/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_2029_599)">
                  <path
                    d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                    fill="#AFB0B1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2029_599">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </Socials>
    </FooterContainer>
  );
}

export default Footer;
