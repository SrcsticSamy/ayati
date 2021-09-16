import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import axios from "axios";

function Results({ayah, chapterKey, setAyaInfo, setShow}) {


    const showTafsir = (ayahText, chapterId) => {
        axios
          .get(`https://api.quran.com/api/v4/chapters/${chapterId}`)
          .then((res) => {
            const chapterName = res.data.chapter.name_arabic;
            setAyaInfo({
                chapterName: chapterName,
                ayahText: ayahText
            })
          });
        
        setShow(true)
                  
    }

    return (
        <Card border="info" bg="dark" className="myCard shadow rounded text-white p-1 mb-3 fw-bold">
            <Card.Body className="m-0">
                <Card.Text className="fs-5">
                    {ayah}
                </Card.Text>
                <Button size="sm" variant="outline-warning" onClick={()=>showTafsir(ayah, chapterKey)}>تفسير</Button>

            </Card.Body>
            
        </Card>
    )
}

export default Results
