import React from "react"
import Button from "@mui/material/Button"

import styles from "./Header.module.scss"
import Container from "@mui/material/Container"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuth } from "../../redux/slices/auth"

export const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickLogout = () => {
    if (window.confirm("Do you really want to logout?")) {
      dispatch(logout())
      window.localStorage.removeItem("token")
      navigate(`/`)
    }
  }
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>TEST BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Create article</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="outlined">Sign in</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
