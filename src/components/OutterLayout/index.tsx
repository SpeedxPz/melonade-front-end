import { Icon, Layout, Menu } from "antd";
import { ClickParam } from "antd/lib/menu";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const StyledLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const StyledContent = styled(Content)`
  margin: 16px;
  padding: 24px;
  background: #fff;
  height: 100%;
  overflow: auto;
`;

const ToggleContainer = styled.div`
  display: flex;
  padding: 12px 24px;
  font-size: 1.8em;
  justify-content: center;
  cursor: pointer;
  background-color: #f35588;
`;

interface IProps extends RouteComponentProps {}

interface IState {
  collapsed: boolean;
}

export default class OutterLayout extends React.Component<IProps, IState> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  changePath = (param: ClickParam) => {
    this.props.history.push(param.key);
  };

  render() {
    return (
      <StyledLayout>
        <Sider collapsible collapsed={this.state.collapsed} trigger={null}>
          <Menu
            theme="dark"
            mode="inline"
            selectable={true}
            defaultOpenKeys={["/definition"]}
            selectedKeys={[this.props.location.pathname]}
          >
            <ToggleContainer onClick={this.toggle}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              />
            </ToggleContainer>
            <Menu.Item key="/transaction" onClick={this.changePath}>
              <Icon type="unordered-list" />
              <span>Transactions</span>
            </Menu.Item>
            <SubMenu
              key="/definition"
              title={
                <span>
                  <Icon type="form" />
                  <span>Definition</span>
                </span>
              }
            >
              <Menu.Item key="/definition/task" onClick={this.changePath}>
                Task Definition
              </Menu.Item>
              <Menu.Item key="/definition/workflow" onClick={this.changePath}>
                Workflow Definition
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <StyledContent>{this.props.children}</StyledContent>
      </StyledLayout>
    );
  }
}