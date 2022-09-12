import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart(){
  const options = {
    method: 'GET',
    
  };
  
  fetch('http://datagrid.apps.k8sdesbb110.desenv.bb.com.br/rest/v2/caches/kafka-debezium-metrics/?action=entries', {
    mode: 'no-cors',
    headers: {
      // cookie: '2cadf896751dbbc86a6fee1e42a978ca=2307d718eaca7f411e3aa0460f208363',
      "Authorization": "Digest developer JWdZBxalcMmfgXOS"
    }
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error("asdasd"));
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  let value = 100;
  const generateData = () => {
    value = Math.round((Math.random() * 10 - 5) + value);
    return {
      name: "asd",
      a: value,
      b: -value+1
    };
  }

  const generateDatas = (count:number) => {
    let data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }
  const data = generateDatas(10);

  return (
    <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip />
        <Line type="monotone" dataKey="a" activeDot={{ r: 8 }} stroke="#8884d8" />
        <Line type="monotone" dataKey="b" stroke="#82ca9d" />
      </LineChart>
  )
}
