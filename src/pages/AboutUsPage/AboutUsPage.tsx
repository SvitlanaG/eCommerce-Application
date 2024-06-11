import { clsx } from 'clsx';
import styles from '@/pages/AboutUsPage/AboutUsPage.module.scss';
import ara from '@/assets/fotos/ara.png';
import svitlana from '@/assets/fotos/svitlana.jpg';
import arseny from '@/assets/fotos/arseny.png';
import rsschool from '@/assets/icons/rs_school_js.svg';

interface TeamMember {
  name: string;
  role: string;
  location: string;
  bio: string;
  contributions: string;
  collaboration: string;
  photo: string;
  github: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ara Stepanyan',
    role: 'Frontend Developer',
    location: 'Yerevan',
    bio: 'Ara is a skilled developer capable of creating client-side websites. He is always eager to learn new technologies and languages. His technical stack includes C, C++, Docker-Compose, and JavaScript. He holds a Master’s Degree from the National Polytechnical University of Armenia and has completed the Common Core program at 42 international coding school.',
    contributions:
      'Comprehensive README, CommerceTools Project and API Client Setup, Main page, 404 page, SUBMIT on Registration, Catalog Product page, Intergration of Login and Registration pages with CommerceTools',
    collaboration:
      'Ara is a driven and initiative-taking team member who consistently aims to achieve the highest results. He effectively collaborated with the team. His purposefulness ensured that all project milestones were met on time.  As a software developer, he played a crucial role in the successful completion of our project.',
    photo: ara,
    github: 'https://github.com/arastepa',
  },
  {
    name: 'Svitlana Grytsai',
    role: 'Frontend Developer, Team Lead',
    location: 'Berlin',
    bio: 'Svitlana is an expat living in Germany who graduated HTW Berlin with a degree in Business Informatics. Currently working as a developer, she has a passion for creating user interfaces and specializes in making online forms for government institutions. Dedicated to continuous learning, she participates in RS School courses to master new technologies and apply them in her work.',
    contributions:
      'Repository Setup, Task Board Setup, Unit Test Coverage, Deploy the App, Basic styles, Footer and Header, Login Page, Registration page, User Profile page, Intergration of User Profile with CommerceTools, About Us Page, Main page, 404 page',
    collaboration:
      'Svitlana effectively organized collaboration within the team, utilizing scrum methodologies and various online tools. She used Jira for task distribution, managed communication via a Discord server, and facilitated online meetings through Zoom. Her dedication to excellence and strong teamwork skills were pivotal in achieving our project goals.',
    photo: svitlana,
    github: 'https://github.com/SvitlanaG',
  },
  {
    name: 'Arseny Maslov',
    role: 'Frontend Developer',
    location: 'Minsk',
    bio: 'Arseny discovered RS-School through acquaintances who had already graduated. With previous front-end learning experience but having taken a long break, he enrolled in Stage 0 this summer to refresh his basics. Simultaneously, he signed up for an RS-School React course. Successfully completing both courses with certificates, he advanced to Stages 1-2 to further enhance his skills in JavaScript and layout development.',
    contributions:
      'Development Environment Configuration, Development Scripts, Deploy the App, Login Page, Registration Page, Detailed Product Page,Intergration of Product Page with CommerceTools.',
    collaboration:
      'Arseny had an idea to use React in the team project, leveraging his familiarity with the technology. He actively supported his teammates by answering their questions and providing guidance on React, contributing significantly to the projects success.',
    photo: arseny,
    github: 'https://github.com/Maslovars',
  },
];

const AboutUsPage = () => {
  return (
    <div>
      <h2>Meet the Team</h2>
      <div className="flex flex-fd-column">
        <div className={styles['rs-school']}>
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={rsschool} alt="RS School Logo" />
          </a>
        </div>
        {teamMembers.map((member, index) => (
          <div
            key={member.github}
            className={clsx(styles['team-member-odd'], {
              [styles['team-member-even']]: index === 1,
            })}
          >
            <div>
              <img src={member.photo} alt={member.name} />
            </div>
            <div>
              <h3>{member.name}</h3>
              <p className={styles['info-text']}>
                <strong>Role:</strong> {member.role}
              </p>
              <p className={styles['info-text']}>
                <strong>Location:</strong> {member.location}
              </p>
              <p className={styles['info-text']}>
                <strong>Bio: </strong>
                {member.bio}
              </p>
              <p className={styles['info-text']}>
                <strong>Contributions:</strong> {member.contributions}
              </p>
              <p className={styles['info-text']}>
                <strong>Collaboration: </strong>
                {member.collaboration}
              </p>
              <a
                href={member.github}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
