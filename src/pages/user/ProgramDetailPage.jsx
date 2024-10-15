import ProgramDetail from '../../component/ProgramDetail/ProgramDetail'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'

import FetchProgramCourses from '../../services/courses/FetchProgramCourses';
import BackButton from '../../component/Button/BackButton';
import { Box } from '@mui/material';
function ProgramDetailPage() {
  return (
    <>
    <Box sx={{position:'relative'}}>
      <Navbar /> 
      <ProgramDetail fetchCourses={FetchProgramCourses} 
      linkPrefix="courses"  />
      <Footer />
    </Box>
    </>
  )
}

export default ProgramDetailPage
