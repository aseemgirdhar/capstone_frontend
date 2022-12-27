import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./questions.scss"
import { QuestionUpload } from "../../api/Api";
import Alert from '@mui/material/Alert';

const theme = createTheme();

const Questions = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [subtag, setSubtag] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [level, setLevel] = useState("");
  const [solution, setSolution] = useState("");
  const [skillTags , setSkillTags] =  useState(["Html" , "Css" , "Bootstrap"]);
  const [msg, setMsg] = useState({
    isSuccess: false,
    isError: false
  })

  const [isError, setIsError] = useState("")
  const [Err, setErr] = useState(false)
  let data = {
    question_title: questionTitle,
    skill_tag: skill,
    sub_tag: subtag,
    total_marks: totalMarks,
    question: problemStatement,
    tag_level: level,
    solution: solution,
  };
//   const scrollToRef = (target) => {
//     window.scrollTo({
//       top: target.current.offsetTop,
//       behavior: "smooth"
//     });
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uploadQue = QuestionUpload(data);
    await uploadQue.then((res) => console.log(res) , event.target.reset())
    .catch((err) => 
    {
        setErr(true)
        setIsError(err.response.data.message)
    })
    // console.log(">>>" , err.response.data.message));
    setSkill(event.target.reset())
  };
  const handleClick = (e) => {
    const tag = e.target.innerText;
   
    document.getElementById("Skill").focus();
    const val = document.getElementById("Skill").value = tag;
    setSkill(val)
    // console.info("You clicked the Chip." ,  skillTags);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={0}
          square
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
             {Err && <Alert severity="error">{isError}</Alert>} 
              <TextField
                margin="normal"
                required
                fullWidth
                id="QuestionTitle"
                label="Question Title"
                name="QuestionTitle"
                
                autoFocus
                onChange={(e) => setQuestionTitle(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="Skill"
                name="Skill"
                placeholder="Skill"
                autoFocus
                onChange={(e) => setSkill(e.target.value)}
              />
              <div className="ChipWrapper">
                {skillTags.map((chip) => <span key={chip} onClick={handleClick}>{chip}</span>)}
              </div>
              {/* <Stack direction="row" spacing={1}>
                <Chip label="Html" value="Html" variant="outlined" id="chip" onClick={(HTML) => handleClick} />
                <Chip label="Css" value={skillTags} variant="outlined" onClick={handleClick} />
              </Stack> */}
              <TextField
                type="text"
                margin="normal"
                required
                fullWidth
                id="subtag"
                label="subtag"
                name="subtag"
                autoFocus
                onChange={(e) => setSubtag(e.target.value)}
              />
              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                id="totalMarks"
                label="totalMarks"
                name="totalMarks"
                autoComplete="totalMarks"
                autoFocus
                onChange={(e) => setTotalMarks(e.target.value)}
              />
              <TextField
                type="text"
                margin="normal"
                required
                fullWidth
                id="problemStatement"
                label="problemStatement"
                name="problemStatement"
                autoComplete="problemStatement"
                autoFocus
                multiline
                rows={4}
                onChange={(e) => setProblemStatement(e.target.value)}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Tag Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  label="Tag Level"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advance">Advance</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                name="solution"
                label="solution Upload"
                type="text"
                id="solution"
                multiline
                rows={4}
                onChange={(e) => setSolution(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Question
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Questions;
