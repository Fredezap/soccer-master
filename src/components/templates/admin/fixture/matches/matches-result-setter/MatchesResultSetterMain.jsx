import React from 'react'
import GroupMatchesResultSetter from '../groups-matches/matches-result-setter/GroupMatchesResultSetter'
import useHeroDetails from '../../../../../common/hero/useHeroDetails'
import SideMenu from '../../../side-menu/SideMenu'
import Hero from '../../../../../common/hero/Hero'
import BracketsMatchesResultSetter from '../brackets-matches/bracket-matches-result-setter/BracketsMatchesResultSetter'

const MatchesResultSetterMain = () => {
  const { adminResultSetter } = useHeroDetails()

  return (
    <div>
      <SideMenu />
      <Hero title={adminResultSetter.title} />
      <div className="bg-light admin-fixture">
        <GroupMatchesResultSetter />
        <BracketsMatchesResultSetter />
      </div>
    </div>
  )
}

export default MatchesResultSetterMain