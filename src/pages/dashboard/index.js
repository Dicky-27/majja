import React, { useState } from "react";
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
  const [selectedKey, setSelectedKey] = useState(1);
  const router = useRouter();

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(
      "Dashboard",
      "1",
      <Icon
        icon="ant-design:home-filled"
        className="me-2"
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
        className="me-2"
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
        className="me-2"
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
        className="me-2"
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
        className="me-2"
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
        className="me-2"
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
        className="me-2"
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
    router.push('/dashboard');
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
            <img src="/images/Logo.svg" />
          </Logo>
          
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            
            items={items}
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
            {selectedKey == 1 ? (
              <DashboardSection/>
            ) : selectedKey == 2 ? (
              <>
                <h1>Appointments</h1>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#FFFFFF",
                  }}
                >
                  Jadwal Appointments
                </div>
              </>
            ) : selectedKey == 3 ? (
              <PatientList></PatientList>
            ) : selectedKey == 4 ? (
              <>
              <DoctorList />
              </>
            ) : selectedKey == 5 ? (
              <DoctorSchedule></DoctorSchedule>
               ) : selectedKey == 6 ? (
                <>
                  <h1>Artikel</h1>
                  <div
                    style={{
                      padding: 24,
                      minHeight: 360,
                      background: "#FFFFFF",
                    }}
                  >
                    Artikel
                  </div>
                </>
            ) : selectedKey == 7 ? (
              <>
                <h1>Pengaturan</h1>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#FFFFFF",
                  }}
                >
                  Pengaturan
                </div>
              </>
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

export default Dashboard;
