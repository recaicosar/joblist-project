import MockAdapter from 'axios-mock-adapter'
import { pickBy, find } from 'lodash'
import jobList from '@/api/jobs/jobs'

export default ({ $img, $axios }) => {
  const mock = new MockAdapter($axios, { delayResponse: 500 })

  const searchParams = (arr, criteria) => {
    return arr.filter(function (obj) {
      return Object.keys(criteria).every(function (c) {
        return obj[c].match(regexModify(criteria[c]))
      })
    })
  }

  const regexModify = (str) => {
    str = str.replace(/[i|İ]/, '[i|İ]')
    const regex = new RegExp(`${str}.*\\b`, 'gi')
    return regex
  }

  /*
  jobList.result.jobList.items.filter(
    item =>
      (item.imageUrl = item.imageUrl
        ? $img(item.imageUrl, {
          width: 74,
          height: 74,
          quality: 80,
          fit: 'cover'
        })
        : null)
  )
*/

  const getList = (req) => {
    const defaultParams = { page: 1, pageSize: 10 }
    const request = { ...defaultParams, ...req.params }
    const { page, pageSize, location, keywords } = request
    const shortAddress = location
    const positionName = keywords
    let { items } = jobList.result.jobList
    items = searchParams(items, pickBy({ shortAddress, positionName }))
    return { items: items.slice((page - 1) * pageSize, page * pageSize), total: items.length }
  }
  mock.onGet('/jobs/search').reply((req) => {
    const parsing = JSON.parse(JSON.stringify(jobList))
    parsing.result.jobList = getList(req)

    return [200, parsing]
  })

  mock.onGet('/job/detail').reply((req) => {
    const { jobId } = req.params
    const response = find(jobList.result.jobList.items, { jobId })

    return [200, response]
  })
}
