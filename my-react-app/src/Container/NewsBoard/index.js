import { useEffect, useState } from "react"
import { JobCard } from "../../components/jobCard"
import { Accordion } from "../../components/Accordion"

export const NewsBoard = (() => {
    const JOB_STORIES_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json"
    let PER_PAGE = 6;
    const [jobIds, setJobIds] = useState([])
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchIds = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(JOB_STORIES_URL)
                const ids = await res.json()
                setJobIds(Array.isArray(ids) ? ids : [])
            } 
            catch (err) {
                setError(err.message || "unknown error")
            } finally {
                setLoading(false)
            }
        }
        fetchIds()
    },[])

    useEffect(() => {
        if(!jobIds.length) return
        const start = page * PER_PAGE;
        const idsToFetch = jobIds.slice(start, start + PER_PAGE)
        if(!idsToFetch.length) return

        const fetchJobs = async () => {
            try {
                setLoading(true)
                setError(null)
                const promises = idsToFetch.map((id) => 
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    .then((res) => {
                        return res.json()
                    })
                 )
                const results = await Promise.all(promises)
                setJobs((prev) => [...prev, ...results])

            } catch (err) {
                    setLoading(false)
                    setError(err.message || "error")
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [jobIds, page])

    const loadMore = () => {
        const maxPages = Math.ceil(jobIds.length/PER_PAGE)
        if(page + 1 >= maxPages) return
        setPage((p) => p + 1)
    }
    const canLoadMore = jobIds.length > (page + 1) * PER_PAGE;

    return <>
    <p>Hacker News Jobs Board</p>
    <Accordion data={{title: "accord title"}}><div>Tarun ANrayan</div></Accordion>
    { jobs?.map((item, index) => {
        console.log("item", item)
        return <JobCard data={item} />
    })}

    {loading && <div>Loading…</div>}
    {/* <JobCard /> */}
    <button onClick={loadMore} disabled={loading || !canLoadMore}>{canLoadMore ? "Load more": "no more jobs"}</button>
    </>  
})