# B LEADER - Luxury Experiences in Salento

## Overview
B LEADER is a luxury travel platform that offers curated driving and yacht experiences in Salento, Italy. This platform allows users to explore, evaluate, and book private experiences.

## Project Structure
This project is built using Next.js and integrates with Alibaba Cloud ModelStudio for machine learning and automation tasks.

## Setting Up Alibaba Cloud ModelStudio

### 1. Obtain Alibaba Cloud Credentials
To integrate ModelStudio, you need to obtain the following credentials from the Alibaba Cloud Console:

- **AccessKey ID**: Used for authentication.
- **AccessKey Secret**: Used for authentication (keep this secure).
- **Region ID**: Your Alibaba Cloud region, e.g., `cn-hangzhou`.
- **Project ID**: Your Alibaba Cloud project ID.

#### Steps to Obtain Credentials:
1. **Sign in** to the [Alibaba Cloud Console](https://account.aliyun.com/login/login.htm).
2. Navigate to **Security and Compliance** > **Identity and Access Management** > **AccessKey Management**.
3. Click **Create AccessKey** and follow the prompts.
4. Copy and securely store both the **AccessKey ID** and **AccessKey Secret** (the Secret cannot be retrieved later).
5. Note down your **Region ID** and **Project ID** from the Alibaba Cloud console.

### 2. Configure Environment Variables
Add the following environment variables to your `.env` file in the project root:

```env
ALIBABA_CLOUD_ACCESS_KEY_ID=your-access-key-id
ALIBABA_CLOUD_ACCESS_KEY_SECRET=your-access-key-secret
ALIBABA_CLOUD_REGION_ID=your-region-id
ALIBABA_CLOUD_PROJECT_ID=your-project-id
ALIBABA_CLOUD_MODEL_STUDIO_ENDPOINT=https://modelstudio.aliyuncs.com
ALIBABA_CLOUD_MODEL_STUDIO_API_VERSION=2023-05-15
LOG_LEVEL=INFO
VALIDATE_CREDENTIALS=true
```

### 3. Validate Credentials
The project includes a utility to validate the Alibaba Cloud credentials. Ensure the following script is included in your application startup:

```typescript
import { validateAlibabaCloudCredentials } from '@/lib/alibabaCloudUtils';

// Validate credentials on application startup
validateAlibabaCloudCredentials();
```

### 4. Use ModelStudio for Machine Learning
ModelStudio can be used for:
- **Developing and Training Models**: Create and train machine learning models for personalized recommendations, sentiment analysis, and more.
- **Automating Tasks**: Automate repetitive tasks such as chatbot interactions, dynamic recommendations, and data analysis.
- **Data Analysis**: Use ModelStudio for predictive analytics and optimizing pricing and availability.

### 5. Integrate Models into the Application
Once models are trained and validated, integrate them into the application using the Alibaba Cloud SDK or APIs.

## Running the Application
To run the application locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Security Considerations
- **Never commit your AccessKey Secret to version control.**
- **Use RAM users** for programmatic access instead of the root/account key to minimize risk.
- **Rotate keys** periodically for enhanced security.

## Benefits of Using ModelStudio
- **Personalization**: Enhance user experience with personalized recommendations.
- **Automation**: Automate repetitive tasks and improve efficiency.
- **Data-Driven Decisions**: Use predictive analytics to optimize pricing and availability.
- **Scalability**: Easily scale machine learning models and integrations.

## Contact
For any questions or support, please contact:
- Email: info@bleaderitaly.com

---