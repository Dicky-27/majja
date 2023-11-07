import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Icon } from "@iconify/react";
import { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import DashboardSection from "../../../components/AdminPage/Dashboard";
import DoctorList from "../../../components/AdminPage/Dashboard/DoctorList";
import PatientList from "../../../components/AdminPage/Dashboard/PatientList";
import NewDoctor from "../../../components/AdminPage/Dashboard/NewDoctor";
import DoctorSchedule from "../../../components/AdminPage/Dashboard/DoctorSchedule";
import { useRouter } from "next/router";
import BookingSchedule from "../../../components/AdminPage/BookingSchedule";
import ArticleDashboard from "../../../components/AdminPage/Dashboard/ArticleDashboard";
import Setting from "../../../components/AdminPage/Dashboard/Setting";
import Cookies from "js-cookie";

const { Header, Content, Footer, Sider } = Layout;

const getKeyDisplayName = (key) => {
  switch (key) {
    case "1":
      return "Dashboard";
    case "2":
      return "Jadwal Temu";
    case "3":
      return "Daftar pasien";
    case "4":
      return "Daftar Dokter";
    case "5":
      return "Jadwal Dokter";
    case "6":
      return "Artikel";
    case "7":
      return "Pengaturan";
    default:
      return "Unknown";
  }
};

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedKey, setSelectedKey] = useState(1);
  const [selectedKeyString, setSelectedKeyString] = useState("1");
  const email = Cookies.get('email');
  const router = useRouter();

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  useEffect(() => {
    if(Cookies.get('is_admin') == "1"){
      setIsAdmin(true)
      if(localStorage.getItem('halamandash')){
        setSelectedKey(Number(localStorage.getItem('halamandash')))
        setSelectedKeyString(localStorage.getItem('halamandash').toString())
      }else{
        setSelectedKey(1)
        setSelectedKeyString("1")
      }
      
    }
    else{
      if(localStorage.getItem('halamandash')){
        setSelectedKey(Number(localStorage.getItem('halamandash')))
        setSelectedKeyString(localStorage.getItem('halamandash').toString())
      }else{
        setSelectedKey(2)
        setSelectedKeyString("2")
      }
    }
    const storedKey = localStorage.getItem('halamandash');
  }, [])

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const itemsAdmin = [
     getItem(
      "Dashboard",
      "1",
      <Icon
        icon="ant-design:home-filled"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
    getItem(
      "Jadwal Temu",
      "2",
      <Icon
        icon="ion:calendar"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
     getItem(
      "Daftar Pasien",
      "3",
      <Icon
        icon="fluent:text-bullet-list-square-person-20-filled"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
     getItem(
      "Daftar Dokter",
      "4",
      <Icon
        icon="fa6-solid:user-doctor"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
    getItem(
      "Jadwal Dokter",
      "5",
      <Icon
        icon="ion:calendar"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
    getItem(
      "Artikel",
      "6",
      <Icon
        icon="ant-design:home-filled"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
    getItem(
      "Pengaturan",
      "7",
      <Icon
        icon="ant-design:setting-filled"
        className="iconDashboard me-2"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          color: "#8D8D8D",
        }}
      />
    ),
  ];

  const itemsDoctor = [
   getItem(
     "Jadwal Temu",
     "1",
     <Icon
       icon="ion:calendar"
       className="iconDashboard me-2"
       style={{
         cursor: "pointer",
         fontSize: "18px",
         color: "#8D8D8D",
       }}
     />
   ),
   getItem(
     "Jadwal Dokter",
     "5",
     <Icon
       icon="ion:calendar"
       className="iconDashboard me-2"
       style={{
         cursor: "pointer",
         fontSize: "18px",
         color: "#8D8D8D",
       }}
     />
   ),
   getItem(
     "Artikel",
     "6",
     <Icon
       icon="ant-design:home-filled"
       className="iconDashboard me-2"
       style={{
         cursor: "pointer",
         fontSize: "18px",
         color: "#8D8D8D",
       }}
     />
   ),
   getItem(
     "Pengaturan",
     "7",
     <Icon
       icon="ant-design:setting-filled"
       className="iconDashboard me-2"
       style={{
         cursor: "pointer",
         fontSize: "18px",
         color: "#8D8D8D",
       }}
     />
   ),
 ];

  function logout(){
    localStorage.clear();
    Cookies.remove('token');
    Cookies.remove('username')
    Cookies.remove('is_admin');
    router.push('/login');
  }
  
  return (
    <>
      <Head>
        <title>{getKeyDisplayName(selectedKey.toString())}</title>
      </Head>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          // collapsible
          // collapsed={collapsed}
          // onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{ height:"100vh", width:'100px', position:'fixed'}}
        >
          <Logo>
            <Img src="/images/Logo.png" />
          </Logo>
          <Menu
            theme="light"
            defaultSelectedKeys={"1"}
            mode="inline"
            items={isAdmin ? itemsAdmin : itemsDoctor}
            onSelect={handleMenuSelect}
          />
          <div className="text-center mx-auto py-1 px-5 my-3" style={{position:'absolute', bottom:'20px'}}>
            <button className="buttonAlt" onClick={() => logout()}>Logout</button>
          </div>
        </Sider>
        <Layout
          style={{width:'100px'}}
        >
          {/* <Header
            style={{
              padding: 0,
              background: "#FFFFFF",
            }}
          /> */}
          <Content
            style={{
              margin: "3rem 3rem",
              marginLeft:'250px'
            }}
          >
            {selectedKey == 1 && isAdmin ? (
              <DashboardSection updateRes={setSelectedKey} />
            ) : selectedKey == 2 ? (
              <BookingSchedule updateRes={setSelectedKey} isAdmin={isAdmin} email={email}/>
            )
            : (isAdmin != "1" && selectedKey == 1) ? (
              <BookingSchedule updateRes={setSelectedKey} isAdmin={isAdmin} email={email}/>
            )
             : selectedKey == 3 && isAdmin ? (
              <PatientList updateRes={setSelectedKey} />
            ) : selectedKey == 4 && isAdmin ? (
              <DoctorList updateRes={setSelectedKey} />
            ) : 
            selectedKey == 5 ? (
              <DoctorSchedule updateRes={setSelectedKey}  isAdmin={isAdmin} email={email} />
               ) : 
               selectedKey == 6 ? (
                <ArticleDashboard updateRes={setSelectedKey} />
            ) : selectedKey == 7 ? (
             <Setting></Setting>
            ) : (
              <></>
            )}
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </>
  );
}

const Logo = styled.div`
  padding: 1.5rem;
`;

const Img = styled.img`
  max-width: 100%; /* Ensure the image doesn't exceed its parent's width */
  height: auto;
  display: block;
  margin: 0 auto; /* Center the image horizontally if needed */
`;

export default Dashboard;
