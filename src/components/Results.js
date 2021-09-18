import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import axios from "axios";

function Results({ayah, chapterKey, verseKey, setAyaInfo, setShow, ayahCopy}) {
    const showTafsir = (ayahText, chapterId, verseKey, ayahCopy) => {
        axios
          .get(`https://api.quran.com/api/v4/chapters/${chapterId}`)
          .then((res) => {
            const chapterName = res.data.chapter.name_arabic;
            getTafsir(verseKey).then(d =>{
                getAudio(verseKey).then(audio => {

                    setAyaInfo({
                        chapterName: chapterName,
                        ayahText: ayahText,
                        tafsir: d,
                        audioUrl: audio,
                        textToCopy: ayahCopy
                    })
                    setShow(true)
                    
                })

                
            })
            
          });
        

        const getTafsir = async (key) => {
            const res = await axios.get(`https://api.quran.com/api/v4/quran/tafsirs/91?verse_key=${key}`)
            return (res.data.tafsirs[0].text);
        }

        const getAudio = async (id) => {
            const res = await axios.get(`https://api.quran.com/api/v4/recitations/1/by_ayah/${id}`)
            return(res.data.audio_files[0].url);
        }
                  
    }

    return (
        <Card border="warning" bg="dark" className="myCard shadow rounded text-white mb-3 lh-lg">
            <Card.Body>
                <Card.Text className="fs-5 fw-bold results" dangerouslySetInnerHTML={{__html: ayah}}>
                </Card.Text>
                <Button size="sm" variant="outline-warning" onClick={()=>showTafsir(ayah, chapterKey, verseKey, ayahCopy)}>تفسير</Button>

            </Card.Body>
            
        </Card>
    )
}

export default Results
