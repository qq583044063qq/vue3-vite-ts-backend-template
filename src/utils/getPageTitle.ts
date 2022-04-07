import appSettings from '../setting'

const title = appSettings.applicationTitle || 'HK416\'s Template'

export default function getPageTitle(pageTitle:string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}