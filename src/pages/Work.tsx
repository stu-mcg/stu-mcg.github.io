import './work.css'
import geoportalImage from '../assets/img/work/geoportal.png'
import omgImage from '../assets/img/work/omg.png'
import edaImage from '../assets/img/work/eda.png'
import NavBar from '../components/NavBar'

function Work() {
  return (<>
    <NavBar/>
    <div className='section-body'>
      <h1>Work</h1>
      <p>
        I am a software developer interested in geospatial technology. Recently I have been working primarly as a full stack web developer focusing on
        projects related to interactive mapping and geovisualization. I also have experience working in remote sensing
      </p>
      <div className='work-list'>
        <div>
          <h3>CliMR Geoportal</h3>
          <img src={geoportalImage}/>
          <p>
            I have developed a set of climate and transportation related geospatial visualizations for the CliMR Geoportal in collaboration with several
            research teams at UBC. A live demo of some of the visualizations is available 
            <a href="https://emissions.ok.ubc.ca/"> here </a>
            and a set of slides about the project which
            I presented at the International Cartographic Conference are available 
            <a href="https://docs.google.com/file/d/1tgKowGaL6xD99v-HvKrptNypxYmNrcgZ/"> here </a>
            .
          </p>
        </div>
        <div>
          <h3>OMG REACT</h3>
          <img src={omgImage}/>
          <p>
            I developed an application called REACT (Recording Experiences of Aquatic Concern with Technology) for the Otipemisiwak Metis Govenment 
            (Metis Nation of Alberta). The app allows users to report and view aquatic concerns such as poaching, invasive species, and Algae blooms.
            The app is currently live but only available for the use of members of the nation.
          </p>
        </div>
        <div>
          <h3>EarthDaily Analyitics</h3>
          <img src={edaImage}/>
          <p>
            I completed an 8 month co-op term at EarthDaily Analytics where I worked on various projects including developing an algorithm to detect
            radio frequency interference in RADAR satellite imagery, and contributing towards the calibration and validation system of EDA's own
            thermal band satellite sensors.
          </p>
        </div>
      </div>
    </div>
  </>)
}

export default Work