import { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface Data {
  cHAVE: number,
  dT_CRIACAO: number,
  dT_PROCESSAMENTO: number,
  dIFF: number
}
export default function Chart(){
  const [data, setData] = useState<Data[]>([])
  let value = 100;
  const generateData = () => {
    value = Math.round((Math.random() * 10 - 5) + value);
    return {
      cHAVE: 1,
      dT_CRIACAO: value,
      dT_PROCESSAMENTO: -value+1,
      dIFF: value+2
    };
  }

  const generateDatas = (count:number) => {
    let data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }
  useEffect(() => {
    // let d: Data[] = generateDatas(10)
    fetch('https://aqt-poc-metrics-generator-aqt-poc-listener-db.apps.k8sdesbb110.desenv.bb.com.br/main/entries')
    .then(res => console.log(res))
    setData(generateDatas(10))
  }, [])
  
  // fetch('http://datagrid.apps.k8sdesbb110.desenv.bb.com.br/rest/v2/caches/kafka-debezium-metrics/?action=entries', {
  //   mode: 'cors',
  //   credentials: 'include',
  //   headers: {
  //     // "Access-Control-Allow-Origin": "*",
  //     // cookie: '2cadf896751dbbc86a6fee1e42a978ca=2307d718eaca7f411e3aa0460f208363',
  //     // "Authorization": "Digest developer JWdZBxalcMmfgXOS"
  //     "Authorization": 'Digest username="developer", realm="default", nonce="AAAAEAAPb8a87+XIzqDEuuzVtsKxayCEWuMaSCHGb7LeLgrjLi55gDXMsII=", uri="/rest/v2/caches/kafka-debezium-metrics/%7B%22_type%22%3A%22string%22%2C%22_value%22%3A%22teste%22%7D", algorithm=MD5, response="1c5fb0cd2a2e57a51f64e0cca130f5e0", opaque="00000000000000000000000000000000", qop=auth, nc=0000000c, cnonce="07dce14f557e56c0'
  //   }
  // })
  //   .then(result => console.log(result))
  //   .catch(err => console.error(err));
  
  return (
    <>
    <LineChart width={500} height={300} data={data} title="Tempo de reconhecimento pelo Cache">
        <XAxis dataKey="cHAVE"/>
        <YAxis/>
        <Tooltip />
        <Line type="monotone" dataKey="dIFF" stroke="#82ca9d" name="millisec"/>
      </LineChart>
      <button onClick={() => setData([...data, generateData()])} >Adicionar data</button>
    </>
    )
}
