import { useEffect, useState} from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { LoadingComponent } from './LoadingComponent';

export const Skills = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY_PROD,
        authDomain: process.env.REACT_APP_AUTHDOMAIN_PROD,
        projectId: process.env.REACT_APP_PROJECTID_PROD,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET_PROD,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_PROD,
        appId: process.env.REACT_APP_APPID_PROD,
        measurementId: process.env.REACT_APP_MEASUREMENTID_PROD
      };
      
      initializeApp(firebaseConfig);

      const db = getFirestore();
      const miColeccion = collection(db, 'skills');
      const consulta = await getDocs(miColeccion);
      const datosArray = [];

      consulta.forEach((doc) => {
        datosArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setData(Object.values(datosArray));
    };

    fetchData();
  }, []);

  return (
    <div id="skills" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Skills</h2>
        </div>
        <div className="row">
          {data[0] ? data.map((dataItem) => (
            <div key={`${dataItem.titulo}`} className="col-xs-6 col-sm-6 col-md-4 col-lg-3" style={{marginBottom: "4em"}}>
              <img className={""} src={dataItem.urlimg} style={{height:"4em"}} alt="logo"></img>
              <h3>{dataItem.titulo}</h3>
            </div>
          ))
          : <LoadingComponent/>}
        </div>
      </div>
    </div>
  );
};