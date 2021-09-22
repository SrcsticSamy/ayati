import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Results({
  ayahText,
  verseKey,
  setAyaInfo,
  setShow,
  ayahTextToCopy,
  chapterName,
}) {
  
  const getTafsir = async (key) => {
    const res = await axios.get(
      `https://api.quran.com/api/v4/quran/tafsirs/91?verse_key=${key}`
    );
    return res.data.tafsirs[0].text;
  };

  const getAudio = async (id) => {
    const res = await axios.get(
      `https://api.quran.com/api/v4/recitations/1/by_ayah/${id}`
    );
    return res.data.audio_files[0].url;
  };

  const showTafsir = (ayahText, verseKey, ayahCopy, chapterName) => {
    getTafsir(verseKey).then((d) => {
      getAudio(verseKey).then((audio) => {
        setAyaInfo({
          chapterName: chapterName,
          ayahText: ayahText,
          tafsir: d,
          audioUrl: audio,
          textToCopy: ayahCopy,
        });
        setShow(true);
      });
    });
  };

  return (
    <Card
      border="warning"
      bg="dark"
      className="shadow rounded text-white mb-3 lh-lg"
    >

      <Card.Header className="small text-muted">
        آية {verseKey.split(":")[1]} من سورة {chapterName}
      </Card.Header>

      <Card.Body className="p-2">

        <Card.Text
          className="fs-5 fw-bold results"
          dangerouslySetInnerHTML={{ __html: ayahText }}
        />
        <Button size="sm" variant="outline-warning" onClick={() => showTafsir(ayahText, verseKey, ayahTextToCopy, chapterName)}>تفسير</Button>

      </Card.Body>
    </Card>
  );
}

export default Results;