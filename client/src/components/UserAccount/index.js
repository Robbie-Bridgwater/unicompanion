import React, { useEffect } from "react";
import { Container, Row, Col } from "../Grid";
import Wrapper from "../Wrapper"
import userAPI from "../../utils/userAPI";

function UserAccount(props) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    userAPI.getSession().then(res => {
      console.log(res);
      setDetails(res.data)
    })
  }, [])

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col size="10">


          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default UserAccount;