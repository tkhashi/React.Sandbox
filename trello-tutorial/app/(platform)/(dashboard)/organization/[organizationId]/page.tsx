import { OrganizationSwitcher } from "@clerk/nextjs";

const OrganizationIdPage = () => {
  return (
    <div>
      Organization Id Page!
      <OrganizationSwitcher hidePersonal />
    </div>
  );
};

export default OrganizationIdPage;
