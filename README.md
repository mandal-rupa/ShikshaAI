# ShikshaAI 🤖📚

## AI-Powered Personalized Teacher

ShikshaAI is an AI-powered learning platform that acts as a personal AI Teacher.

It analyzes uploaded educational material, creates a personalized lesson, explains concepts using AI-generated teaching content and voice, interacts with the learner, adapts based on answers, conducts assessments, and provides personalized learning feedback.

---

## 🚀 Problem

Students often receive the same learning material and explanations regardless of their learning level, language preference, or understanding.

ShikshaAI solves this by providing an interactive AI Teacher that adapts the learning experience according to the learner.

---

## 💡 Solution

ShikshaAI provides an end-to-end personalized learning journey:

1. Upload educational material
2. Extract and understand document content
3. Retrieve relevant knowledge using RAG
4. Generate a personalized lesson plan
5. Explain the topic using an AI Teacher
6. Provide spoken explanations
7. Allow students to ask doubts
8. Generate interactive questions
9. Adapt question difficulty based on performance
10. Conduct a final assessment
11. Generate personalized AI feedback
12. Recommend revision and next learning steps

---

## ✨ Key Features

### 📄 Educational Material Understanding
Students can upload PDF or DOCX educational material.

### 🧠 RAG-Based Learning
The uploaded material is divided into chunks and relevant sections are retrieved before generating the lesson or explanation.

### 📝 AI Lesson Planner
Gemini generates a structured lesson according to:

- Topic
- Learning level
- Available learning time
- Preferred language
- Uploaded educational material

### 🤖 AI Teacher
The AI Teacher explains concepts in a friendly and student-focused way.

### 🔊 Voice Teaching
The browser's speech synthesis capability is used to provide spoken explanations.

Supported teaching languages:

- English
- Hindi
- Hinglish

### 💬 Interactive Learning
Students can:

- Ask questions
- Ask doubts
- Answer teacher questions
- Receive contextual explanations

### 🔄 Adaptive Learning
The system evaluates student answers.

Correct answers can lead to harder questions.

Incorrect answers trigger simpler explanations and easier questions.

### 📊 Final Assessment
Students complete a final assessment and receive a score.

### 📈 Learning Report
The system shows:

- Overall score
- Correct and incorrect answers
- Concepts understood
- Areas requiring revision
- Personalized feedback
- Recommended next steps

### 📋 Dashboard
The dashboard provides access to:

- Lessons
- Upload Material
- AI Teacher
- Assessments
- Learning Report
- Learning Progress

---

## 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │     Student      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    │      Vite        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node + Express   │
                    │     Backend      │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌────────────┐ ┌─────────────┐ ┌─────────────┐
       │   Upload   │ │ RAG Service │ │ AI Service  │
       │ Processing │ │             │ │   Gemini    │
       └─────┬──────┘ └──────┬──────┘ └──────┬──────┘
             │               │               │
             └───────────────┼───────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Personalized AI  │
                    │      Teacher     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        Explanation      Questions     Assessment
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌──────────────────┐
                    │ Learning Report  │
                    └──────────────────┘