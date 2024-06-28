import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import AboutUsPage from '@/pages/AboutUsPage/AboutUsPage';

const mockTeamMembers = [
  {
    name: 'Ara Stepanyan',
    role: 'Frontend Developer',
    location: 'Yerevan',
    bio: 'Ara is a skilled developer capable of creating client-side websites. He is always eager to learn new technologies and languages. His technical stack includes C, C++, Docker-Compose, and JavaScript.He has completed the Common Core program at 42 international coding school.',
    contributions:
      'Comprehensive README, CommerceTools Project and API Client Setup, Main Page, 404 Page, Submit on Registration, Catalog Product Page, Intergration of Login and Registration Pages with CommerceTools, Basket Page',
    collaboration:
      'Ara is a driven and initiative-taking team member who consistently aims to achieve the highest results. He effectively collaborated with the team. His purposefulness ensured that all project milestones were met on time. As a software developer, he played a crucial role in the successful completion of our project.',
    photo: '@/assets/fotos/ara.png',
    github: 'https://github.com/arastepa',
  },
  {
    name: 'Svitlana Grytsai',
    role: 'Frontend Developer, Team Lead',
    location: 'Berlin',
    bio: 'Svitlana is an expat living in Germany who graduated HTW Berlin with a degree in Business Informatics. Currently working as a developer, she has a passion for creating user interfaces and specializes in making online forms for government institutions. Dedicated to continuous learning, she participates in RS School courses to master new technologies and apply them in her work.',
    contributions:
      'Repository Setup, Task Board Setup, Unit Test Coverage, Deploy the App, Basic styles, Footer and Header, Login Page, Registration Page, User Profile Page, Intergration of User Profile with CommerceTools, About Us Page, Main Page, 404 Page, Basket Page',
    collaboration:
      'Svitlana effectively organized collaboration within the team, utilizing scrum methodologies and various online tools. She used Jira for task distribution, managed communication via a Discord server, and facilitated online meetings through Zoom. Her dedication to excellence and strong teamwork skills were pivotal in achieving our project goals.',
    photo: '@/assets/fotos/svitlana.jpg',
    github: 'https://github.com/SvitlanaG',
  },
  {
    name: 'Arseny Maslov',
    role: 'Frontend Developer',
    location: 'Minsk',
    bio: 'Arseny discovered RS-School through acquaintances who had already graduated. With previous front-end learning experience but having taken a long break, he enrolled in Stage 0 this summer to refresh his basics. Simultaneously, he signed up for an RS-School React course. Successfully completing both courses with certificates, he advanced to Stages 1-2 to further enhance his skills in JavaScript and layout development.',
    contributions:
      'Development Environment Configuration, Development Scripts, Deploy the App, Login Page, Registration Page, Detailed Product Page,Intergration of Product Page with CommerceTools, Basket Page.',
    collaboration:
      'Arseny had an idea to use React in the team project, leveraging his familiarity with the technology. He actively supported his teammates by answering their questions and providing guidance on React, contributing significantly to the projects success.',
    photo: '@/assets/fotos/arseny.png',
    github: 'https://github.com/Maslovars',
  },
];

vi.mock('@/pages/AboutUsPage', () => ({
  teamMembers: mockTeamMembers,
}));

vi.mock('./AboutUsPage.module.css', () => ({
  default: {
    'rs-school': 'rs-school',
    'team-member-odd': 'team-member-odd',
    'team-member-even': 'team-member-even',
    'info-text': 'info-text',
    link: 'link',
  },
}));

describe('AboutUsPage', () => {
  beforeEach(() => {
    render(<AboutUsPage />);
  });

  it('should render the title "Meet the Team"', () => {
    expect(screen.getByText('Meet the Team')).toBeInTheDocument();
  });

  it('should render RS School link with logo', () => {
    const rsSchoolLink = screen.getByRole('link', { name: /RS School Logo/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/');
    expect(screen.getByAltText('RS School Logo')).toBeInTheDocument();
  });

  it('should render all team members with correct details', () => {
    mockTeamMembers.forEach((member) => {
      const roleElements = screen.getAllByText(member.role);
      roleElements.forEach((roleElement) => {
        expect(roleElement).toBeInTheDocument();
      });

      const locationElements = screen.getAllByText(member.location);
      locationElements.forEach((locationElement) => {
        expect(locationElement).toBeInTheDocument();
      });

      const bioElement = screen.getByText(member.bio);
      expect(bioElement).toBeInTheDocument();

      const contributionsElement = screen.getByText(member.contributions);
      expect(contributionsElement).toBeInTheDocument();

      const collaborationElement = screen.getByText(member.collaboration);
      expect(collaborationElement).toBeInTheDocument();
    });
  });

  it('should render GitHub profile links for each team member with correct href', () => {
    const githubLinks = screen.getAllByRole('link', {
      name: /GitHub Profile/i,
    });
    githubLinks.forEach((link, index) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', mockTeamMembers[index].github);
    });
  });

  it('should apply correct classes to team members based on index', () => {
    const teamMemberDivs = screen.getAllByRole('article');
    expect(teamMemberDivs[0]).toHaveClass(/team-member-odd/i);
    expect(teamMemberDivs[1]).toHaveClass(/team-member-even/i);
  });
});
