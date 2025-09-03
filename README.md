# 📖 MyTale – AI-powered Story Reading Platform

Mytale is a **web-based platform** that allows users to read, search, and interact with stories.  
The system integrates **AI features** such as summarization, recommendations, and advanced search to provide a **personalized and modern reading experience**.

---

## 1. Problem Statement

Traditional reading platforms face several issues:
- Limited personalized recommendations.
- Lack of AI features (summarization, translation, chatbot).
- Difficulties for authors in managing stories and reaching readers.
- Scattered story sources, leading to inconsistent quality.

Mytale aims to solve these by creating an **AI-powered centralized platform** for both readers and authors.

---

## 2. Survey / Existing Solutions

- **Wattpad**: Popular but lacks smart search and AI summarization.  
- **Goodreads**: Strong in book management but not interactive enough.  
- **Local Vietnamese platforms**: Often limited features, outdated UI/UX.  

➡️ **Mytale differentiates itself** by combining:
- Smart AI-based features (summarization, recommendation, chatbot).  
- Clear user roles (Reader – Author – Admin).  
- Modern UX/UI design.  

---

## 3. Objectives & Scope

### 🎯 Objectives
- Build a **web-based story platform** with user, author, and admin modules.  
- Integrate **AI features**: summarization, personalized recommendations, smart search.  
- Deploy a working web application accessible online.  

### 📌 Scope
**In Scope:**
- User module: register/login, read, search, favorites, comment, rating.  
- Author module: create/manage stories & chapters, AI-assisted tagging.  
- Admin module: approve content, manage users, monitor system.  
- AI module: summarization, recommendations, contextual search.  

**Out of Scope:**
- Mobile app version.  
- Offline reading support.  

---

## 4. Key Features & Requirements

### 👤 User
- Sign up / Sign in.  
- Browse & search stories with filters.  
- Read stories online (text & comic).  
- Comment, rate, save favorites.  
- Receive AI-powered recommendations.  

### ✍️ Author
- Manage stories & chapters.  
- Add tags, genres, metadata.  
- Use AI tools (summarization, auto-tagging).  

### 🛠️ Admin
- Manage users & roles.  
- Approve or reject submitted stories.  
- Monitor system & analytics.  

### 🤖 AI Features
- Story summarization (per chapter).  
- AI-powered recommendations.  
- Contextual smart search.  
- (Optional) Translation & chatbot.  

---

## 5. Constraints & Assumptions

- **Time**: Project must be completed within one semester (Aug–Dec 2025).  
- **Technology**:  
  - Frontend: ReactJS / HTML-CSS-JS.  
  - Backend: Java Spring Boot or Node.js.  
  - Database: MySQL.  
  - AI: Python (FastAPI) + Groq API.  
- **Resources**: 1 Project Manager + 6 members.  

---

## 6. Target Users / Stakeholders

- **Readers** (18–30, students/young adults): want modern, AI-enhanced reading.  
- **Authors**: need tools to publish and manage stories effectively.  
- **Admins**: ensure content quality and manage the system.  
- **Mentor / Stakeholders**: oversee progress and results.  

---

## 7. Technology Stack

- **Frontend:** HTML, CSS, JavaScript (React optional)  
- **Backend:** Java Spring Boot / Node.js  
- **Database:** MySQL  
- **AI Integration:** Python (FastAPI) + Groq API  
- **Version Control:** Git + GitHub  
- **Project Management:** OpenProject, GitHub Projects  
- **Tools:** VS Code, Postman, Draw.io  

---

## 8. Project Timeline

| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| Initiation & Planning | 3 weeks | 18/08/2025 | 07/09/2025 |
| System Design | 2 weeks | 08/09/2025 | 21/09/2025 |
| Development | 5 weeks | 22/09/2025 | 26/10/2025 |
| Testing | 2 weeks | 27/10/2025 | 09/11/2025 |
| Deployment | 1 week | 10/11/2025 | 16/11/2025 |
| Maintenance & Improvement | 3 weeks | 17/11/2025 | 07/12/2025 |

---

## 9. Potential Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Limited AI/NLP expertise | Medium | Start simple demo, consult mentor. |
| Tight timeline (1 semester) | High | Agile sprints, focus on MVP first. |
| Team workload imbalance | Medium | Assign tasks by strength, use Scrum board. |
| Competition from Wattpad/Goodreads | Medium | Differentiate via AI + local focus. |

---

## 10. Expected Outcomes / Deliverables

- ✅ A fully functional **web application** deployed online.  
- ✅ Source code on **GitHub** with documentation.  
- ✅ Project documentation (proposal, reports).  
- ✅ User guide and developer manual.  
- ✅ Final presentation slides & demo.  

---

## 11. Team Members

- **Hào Nguyễn** – Project Manager (PM)  
- **Bảo Khanh** – Team Member  
- **Thái Hòa** – Team Member  
- **Quốc Huy** – Team Member  
- **Xuân Huy** – Team Member  
- **Văn Hà** – Team Member  

---

## 12. Project Mentor

- **MSc Hoang, Nguyen Thai** – International School, Duy Tan University  

---

## 📖 License
This project is licensed under the **MIT License** – see [LICENSE](LICENSE) file for details.

---

✨ *Mytale – Read. Create. Imagine.* ✨

---

## ⚡ How to Run (later)

```bash
# clone repo
git clone https://github.com/Push-3125/MyTale.git
cd MyTale

# run frontend (if using React)
npm install
npm start

# run backend (if using Spring Boot)
./mvnw spring-boot:run
