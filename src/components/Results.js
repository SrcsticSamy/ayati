import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import axios from "axios";

function Results({ayah, chapterKey, verseKey, setAyaInfo, setShow}) {


    const showTafsir = (ayahText, chapterId, verseKey) => {
        axios
          .get(`https://api.quran.com/api/v4/chapters/${chapterId}`)
          .then((res) => {
            const chapterName = res.data.chapter.name_arabic;
            getTafsir(verseKey).then(d =>{
                setAyaInfo({
                    chapterName: chapterName,
                    ayahText: ayahText,
                    tafsir: d
                })
            })
            
          });
        

        const getTafsir = async (key) => {
            const res = await axios.get(`https://api.quran.com/api/v4/quran/tafsirs/91?verse_key=${key}`)
            setShow(true)
            return (res.data.tafsirs[0].text);
        }
                  
    }

    return (
        <Card border="warning" bg="dark" className="myCard shadow rounded text-white mb-3 lh-lg">
            <Card.Body>
                <Card.Text className="fs-5">
                    {ayah}
                </Card.Text>
                <Button size="sm" variant="outline-warning" onClick={()=>showTafsir(ayah, chapterKey, verseKey)}>تفسير</Button>

            </Card.Body>
            
        </Card>
    )
}

export default Results
