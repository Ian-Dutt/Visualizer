import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'
import './css/navbar.css'
export default function NavBar() {
  return (
    <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/pathfinder">
                        PathFinder
                    </NavLink>
                    <NavLink to="/sorting">
                        Sorting
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
  )
}

const Nav = styled.nav`
  font-size: 2vw;
  font-family: sans-serif;
  background: #7851a9;
  display: flex;
  justify-content: space-between;
  padding: 2vw;
  align-items: center
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`

const NavLogo = styled.div`
  color: #333333;
  padding: 0 1vw;
  display: flex;
  align-items: center;
  white-space: nowrap;
`

const NavLink = styled(Link)`
  color: #B7B78A;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1vw;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #DDDDDD;
  };
`