import React from 'react'
import { withRouter } from 'react-router'
import { DataState } from './StateContext'
import Header from '../Header'
import Playlist from '../Playlist'
import VidPlayer from '../VidPlayer'
import FAIco from '../FAIco'
import STSectionBox from './STSectionBox'
import ST404 from '../ST404'

const Practice = ({hist,path,trialing,obj}) => {

    let t = []
    Object.keys(obj).forEach((b) => {
        let book = obj[b],
            tests = []

            Object.keys(book.tests).forEach((test) => {
                let tTest = book.tests[test],
                    unavail = Object.keys(tTest.collection).some((v) => tTest.collection[v].id === 0),
                    pPath = path+'/'+b+'/'+test

                if (!trialing && unavail)
                    tests.push(<div className="stPracticeTest inactive">{tTest.name}</div>)
                else
                    tests.push(<div className="stPracticeTest" onClick={(e) => hist.push(pPath)}>{tTest.name}</div>)
            })
        t.push(
            <section className="stPracticeBook">
                <div className="stPracticeBookName">{book.name}</div>
                <div className="stPracticeTests">{tests}</div>
            </section>
        )
    })
    return t
}

const Course = (props) => {
    _st.bodyClass = 'main'
    console.log(props)
    return null
    const { params } = match,
        icons = {
            english: 'comment-dots',
            math: 'calculator',
            reading: 'book',
            science: 'microscope',
            essay: 'edit'
        }
        console.log(modalActive)
    return(
        <DataState.Consumer>
            {(data) => {
                
                try {
                    var activeObj = Object.entries(params).reduce((obj,val) => {
                        if (typeof val[1] === 'undefined')
                            return obj
                        else
                            if ( !(val[1] in obj[val[0]]) ) throw true
                            return obj[val[0]][val[1]]
                    }, data)

                    if (activeObj.type === 'playlist')
                        return (
                            <Playlist loc={loc} hist={hist} match={match} obj={activeObj} />
                        )
                    else
                        var sections = [],
                            collections = data.courses[params.courses].collections

                        Object.keys(collections).forEach((val) => {
                            if (val === 'practice') return
                            sections.push(<STSectionBox hist={hist} path={loc.pathname+'/'+val} {...collections[val]} icon={icons[val]} />)
                        })

                        return (
                            <React.Fragment>
                                <Header title={data.courses[params.courses].name} hist={hist} />
                                <main className="stAppStage stComponentFade">
                                    <div className="stAppStageInner">
                                        <div className="stCourseTop">
                                            <div className="stCourseIntro">
                                                <VidPlayer showTitle video={data.courses[params.courses].intro} />
                                            </div>
                                            <div className="stCourseActions">
                                                <div className="stCourseSearch">
                                                    <div className="stCourseAction"><FAIco title="Search this course" icon="search"/><span className="stActionTxt">Search videos</span></div>
                                                </div>
                                                <div className="stCourseBarHeading">My Videos</div>
                                                <div className="stCourseBar">
                                                    <div className="stCourseAction" onClick={() => modalActive(true)}><FAIco title="Downloads" icon="cloud-download-alt"/><span className="stActionTxt">Downloads</span></div>
                                                    <div className="stCourseAction"><FAIco title="Take a practice test" icon="file-alt"/><span className="stActionTxt">Practice Test</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stSectionsSection">
                                            {sections}
                                        </div>
                                        <div className="stPracticeSection">
                                            <div className="boxHeader"></div>
                                            <div className="stPracticeSectionInner">
                                                <div className="stPracticeTop">
                                                    <div className="boxIco"><FAIco title={collections.practice.name} icon="chart-line"/></div>
                                                    <div className="boxTitle">Practice</div>
                                                    <div className="stPracticeNote">{!data.user.trialing ? '(Note: some sections may not be available during the trial period.)' : ''}</div>
                                                </div>
                                                <div className="stPracticeBody">
                                                    <Practice hist={hist} path={loc.pathname+'/practice'} trialing={data.user.trialing} obj={collections.practice.collection} />
                                                </div>
                                            </div>
                                        </div>
                                        <img src="https://learn.mangolanguages.com/img/layout/eeab0bf6ba36be53e4b4fb450c303305.png"/>
                                    </div>
                                </main>
                            </React.Fragment>
                        )
                } catch (e) {
                    console.log(e)
                    return (
                        <ST404 />
                    )
                }
            }}
        </DataState.Consumer>
    )
}

export default Course