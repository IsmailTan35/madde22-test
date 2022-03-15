import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios"
import { SetStateAction, useState } from 'react'

const Home: NextPage = () => {
  const [data, setData] = useState<any>([])
  const [value, setValue] = useState('')
  const [searchText, setSearchText] = useState('')
  const [bool,setBoolean] = useState(false)

  const getData = async () => {
    const res=await axios.get(`http://www.omdbapi.com/?s=${value}&type=movie&apikey=4a249f8d`)
    if(!res.data.Search) {
      setData([])
      setSearchText("")
      return setBoolean(true)
    }
    setData(res.data.Search)
    setSearchText(value)
    setBoolean(false)
  }

  function textClear() {
    setValue('')
    setSearchText('')
    setData([])
    setBoolean(false)
  }

  function textChange(e: { target: { value: SetStateAction<string> } }) {
    setValue(e.target.value)
  }
  return (

    <div className={styles.container}>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            {"OMDb API"}
          </div>
          <div className={styles.subtitle}>
            {"The Open Movie Database 🍿"}
          </div>
          <div className={styles.searchBar}>
            <div className={styles.searchWrapper}>
              <label className={styles.searchLabel}>{"Movie Title"}</label>
              <div className={styles.search}>
                <div className={styles.searchIcon}>
                  <i className="fa fa-search"></i>
                </div>
                <input 
                  type="text" 
                  placeholder="Search" 
                  onChange={textChange} 
                  value={value} 
                  className={styles.searchInput}
                  onKeyDown={(e) => {e.key === 'Enter' && getData()}}
                  />
              </div>
            </div>
          <div className={styles.buttonWrapper}>
            <div onClick={textClear} className={value.length==0?styles.buttonClear:styles.button}>{"Clear"}</div>
            <div onClick={getData} className={styles.button} >{"Search"}</div>
          </div>
          </div>
        </div>
        <div className={styles.cardWrapper}>
            {!searchText?
              <div className={styles.cardHeader}>
                {bool?"Not found!":"Search results will appear here"}
              </div>:
              <>
                <div className={styles.cardHeader}>
                  {`Result for "${searchText}" (${data.length})`}
                </div>
                  <div className={styles.desktopHeader}>{"click on a movie title to learn more about it"}</div>
                  <div className={styles.mobileHeader}>{"tap on a movie title to learn more about it"}</div>
                <div className={styles.cardFilmsWrapper}>
                {data.length>0? data.map((item:any)=>{
                  return(
                    <>
                    <div className={styles.filmTitle}>
                        {item.Title}
                      </div>
                    </>
                  )
                }):
                <div>{"Not found"}</div>}
              </div>
              </>
            }
        </div>
      </main>
    </div>
  )
}

export default Home
