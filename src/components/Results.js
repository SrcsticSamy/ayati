import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";

function Results({sura, ayah}) {
    return (
        <Card border="info" bg="dark" className="myCard text-white p-1 mb-3 fw-bold">
            <Card.Body className="m-0">
                <Card.Text className="fs-4">
                    {ayah}
                </Card.Text>
                <Card.Footer className="text-muted d-flex flex-row px-4 align-items-center justify-content-between">
                   سورة {sura}
                    <Button variant="outline-warning">Tafsir</Button>

                </Card.Footer>
            </Card.Body>
            
        </Card>
    )
}

export default Results
