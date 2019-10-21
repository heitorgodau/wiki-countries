import React from 'react';
import { Link } from 'react-router-dom';



const CountryDetail = (props) => {
  const { id } = props.match.params;
  const { countriesList} = props
  
  const getCountry = (id) => countriesList.find(oneCountry => oneCountry.cca3 === id);

  const foundCountry = getCountry(id, 10);

  const getBorders = () => {
    if (foundCountry.borders.length === 0) return <li>{`${foundCountry.name.common} has no borders with any country`}</li>
    return foundCountry.borders.map((border) => {
      const { flag, name } = getCountry(border, 10);
      return <li><Link to={`/${border}`}>{`${flag} ${name.common}`}</Link></li>

    })
  }

  return(
    <div className="col-md-7 col-sm-12">
      <h1>{foundCountry.flag}{foundCountry.name.official}</h1>
        <table className="table">
          <tbody>
            <tr>
              <td className="capital-title">Capital</td>
              <td>{foundCountry.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>{foundCountry.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul className="borders-list">
                  {
                    getBorders()
                  }
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default CountryDetail;