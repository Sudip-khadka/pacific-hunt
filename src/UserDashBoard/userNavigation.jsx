import React, { useEffect, useState } from "react";
import styled from "styled-components";
import activeNotification from "../assets/Dashboard/activeNotification.png";

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  height: 80px;
  padding: 20px 32px;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  background: var(--Primary-950, #04334d);
  box-shadow: 0px 2px 5px 2px rgba(190, 204, 255, 0.15);
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  .username {
    color: var(--Neutral-White, #FFF);
    text-align: center;
    font-family: "Be Vietnam Pro";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }

  img {
    width: 40px;  /* Adjust as necessary */
    height: 40px;  /* Adjust as necessary */
    border-radius: 50%;
  }
`;

function UserNavigation() {
  const [notification, setNotification] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setEmployees(JSON.parse(storedData));
    }
  }, []);
  return (
    <Navbar>
          <Profile>
            
             <p className="username">{employees?.username || "User"}</p>
          </Profile>
      {notification ? (
        <img src={activeNotification} width="24px" height="24px" alt="Active Notification" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20.7002 16.4906C20.147 15.5344 19.4814 13.7156 19.4814 10.5V9.83438C19.4814 5.68125 16.1533 2.27813 12.0564 2.25H12.0002C11.0165 2.25123 10.0427 2.4462 9.13435 2.82378C8.22601 3.20135 7.40094 3.75414 6.70624 4.45058C6.01154 5.14702 5.46082 5.97347 5.08552 6.88275C4.71022 7.79202 4.51769 8.76632 4.51892 9.75V10.5C4.51892 13.7156 3.8533 15.5344 3.30017 16.4906C3.1664 16.7185 3.0952 16.9777 3.09377 17.2419C3.09235 17.5061 3.16075 17.7661 3.29205 17.9954C3.42335 18.2247 3.6129 18.4152 3.84151 18.5477C4.07012 18.6803 4.32968 18.75 4.59392 18.75H8.25017C8.25017 19.7446 8.64526 20.6984 9.34852 21.4016C10.0518 22.1049 11.0056 22.5 12.0002 22.5C12.9947 22.5 13.9486 22.1049 14.6518 21.4016C15.3551 20.6984 15.7502 19.7446 15.7502 18.75H19.4064C19.6706 18.7517 19.9305 18.6831 20.1595 18.5513C20.3884 18.4196 20.5783 18.2293 20.7095 18C20.8397 17.7694 20.9073 17.5088 20.9056 17.2441C20.904 16.9793 20.8332 16.7196 20.7002 16.4906ZM12.0002 21C11.4042 20.9975 10.8333 20.7597 10.4119 20.3383C9.99048 19.9168 9.75264 19.346 9.75017 18.75H14.2502C14.2477 19.346 14.0099 19.9168 13.5884 20.3383C13.167 20.7597 12.5961 20.9975 12.0002 21ZM4.59392 17.25C5.2408 16.125 6.01892 14.0531 6.01892 10.5V9.75C6.01645 8.96295 6.16934 8.18316 6.46882 7.45532C6.7683 6.72747 7.20849 6.06589 7.76414 5.50849C8.3198 4.95109 8.98 4.50884 9.70691 4.20708C10.4338 3.90533 11.2131 3.75 12.0002 3.75H12.047C15.3189 3.76875 17.9814 6.50625 17.9814 9.83438V10.5C17.9814 14.0531 18.7595 16.125 19.4064 17.25H4.59392Z"
            fill="white"
            stroke="white"
            strokeWidth="0.4"
          />
        </svg>
      )}
    </Navbar>
  );
}

export default UserNavigation;
