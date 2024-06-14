-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 14-06-2024 a las 03:20:25
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Candidatoslti`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Application`
--

CREATE TABLE `Application` (
  `id` int(11) NOT NULL,
  `position_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `application_date` date NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `current_interview_step` int(11) DEFAULT 1,
  `average_score` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Application`
--

INSERT INTO `Application` (`id`, `position_id`, `candidate_id`, `application_date`, `status`, `notes`, `current_interview_step`, `average_score`) VALUES
(1, 1, 1, '2020-03-01', 'Under Review', 'Strong candidate with relevant experience', 2, '4.60'),
(2, 2, 2, '2020-04-15', 'Pending', 'Awaiting feedback from hiring manager', 1, '0.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Candidate`
--

CREATE TABLE `Candidate` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Candidate`
--

INSERT INTO `Candidate` (`id`, `first_name`, `last_name`, `email`, `phone`, `address`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St, Anytown'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Elm St, Othertown');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Company`
--

CREATE TABLE `Company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Company`
--

INSERT INTO `Company` (`id`, `name`) VALUES
(1, 'Company A'),
(2, 'Company B'),
(3, 'Company C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Education`
--

CREATE TABLE `Education` (
  `id` int(11) NOT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Education`
--

INSERT INTO `Education` (`id`, `institution`, `title`, `start_date`, `end_date`, `candidate_id`) VALUES
(1, 'University of ABC', 'Bachelor of Science', '2010-09-01', '2014-06-30', 1),
(2, 'XYZ College', 'Master of Arts', '2015-08-01', '2017-05-30', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Employee`
--

CREATE TABLE `Employee` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `hire_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Employee`
--

INSERT INTO `Employee` (`id`, `company_id`, `name`, `position`, `email`, `phone`, `hire_date`) VALUES
(1, 1, 'Alice Johnson', 'HR Manager', 'alice.johnson@companyA.com', '111-222-3333', '2018-03-15'),
(2, 2, 'Bob Williams', 'Software Developer', 'bob.williams@companyB.com', '444-555-6666', '2019-06-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EmploymentType`
--

CREATE TABLE `EmploymentType` (
  `id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `EmploymentType`
--

INSERT INTO `EmploymentType` (`id`, `type_name`) VALUES
(1, 'Full-time'),
(2, 'Part-time'),
(3, 'Contractor'),
(4, 'Intern');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Interview`
--

CREATE TABLE `Interview` (
  `id` int(11) NOT NULL,
  `application_id` int(11) DEFAULT NULL,
  `interview_step_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Interview`
--

INSERT INTO `Interview` (`id`, `application_id`, `interview_step_id`, `employee_id`, `interview_date`, `result`, `score`, `notes`) VALUES
(1, 1, 1, 2, '2020-03-10', 'Passed', '4.50', 'Impressed with technical knowledge'),
(2, 1, 2, 1, '2020-03-20', 'Passed', '4.70', 'Excellent communication skills demonstrated');

--
-- Disparadores `Interview`
--
DELIMITER $$
CREATE TRIGGER `update_average_score` AFTER INSERT ON `Interview` FOR EACH ROW BEGIN
    DECLARE total_score DECIMAL(5,2);
    DECLARE interview_count INT;

    -- Calcular la nueva puntuación media
    SELECT SUM(score), COUNT(*) INTO total_score, interview_count
    FROM Interview
    WHERE application_id = NEW.application_id;

    -- Actualizar la puntuación media en la tabla Application
    UPDATE Application
    SET average_score = total_score / interview_count
    WHERE id = NEW.application_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `InterviewFlow`
--

CREATE TABLE `InterviewFlow` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `InterviewFlow`
--

INSERT INTO `InterviewFlow` (`id`, `description`) VALUES
(1, 'Standard interview process'),
(2, 'Technical role specific flow');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `InterviewStep`
--

CREATE TABLE `InterviewStep` (
  `id` int(11) NOT NULL,
  `interview_flow_id` int(11) DEFAULT NULL,
  `interview_type_id` int(11) DEFAULT NULL,
  `step_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `InterviewStep`
--

INSERT INTO `InterviewStep` (`id`, `interview_flow_id`, `interview_type_id`, `step_order`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `InterviewType`
--

CREATE TABLE `InterviewType` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `InterviewType`
--

INSERT INTO `InterviewType` (`id`, `name`, `description`) VALUES
(1, 'Phone Interview', 'Initial screening over the phone'),
(2, 'Technical Interview', 'Assessment of technical skills'),
(3, 'Behavioral Interview', 'Evaluation of behavioral fit');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Position`
--

CREATE TABLE `Position` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `employment_type_id` int(11) DEFAULT NULL,
  `interview_flow_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Position`
--

INSERT INTO `Position` (`id`, `company_id`, `title`, `description`, `employment_type_id`, `interview_flow_id`, `status_id`) VALUES
(1, 1, 'Software Engineer', 'Develop new software applications', 1, 1, 1),
(2, 2, 'Marketing Manager', 'Lead marketing strategy and campaigns', 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PositionStatus`
--

CREATE TABLE `PositionStatus` (
  `id` int(11) NOT NULL,
  `status_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `PositionStatus`
--

INSERT INTO `PositionStatus` (`id`, `status_name`) VALUES
(1, 'Open'),
(2, 'Closed'),
(3, 'On Hold');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Resume`
--

CREATE TABLE `Resume` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Resume`
--

INSERT INTO `Resume` (`id`, `file_path`, `file_type`, `upload_date`, `candidate_id`) VALUES
(1, 'path_to_resume1.pdf', 'PDF', '2020-01-15', 1),
(2, 'path_to_resume2.pdf', 'PDF', '2020-02-20', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `WorkExperience`
--

CREATE TABLE `WorkExperience` (
  `id` int(11) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `WorkExperience`
--

INSERT INTO `WorkExperience` (`id`, `company`, `position`, `description`, `start_date`, `end_date`, `candidate_id`) VALUES
(1, 'ABC Inc.', 'Software Engineer', 'Developed web applications using Java and JavaScript', '2014-07-01', '2019-12-31', 1),
(2, 'XYZ Corp.', 'Marketing Specialist', 'Managed digital marketing campaigns', '2017-06-01', '2020-02-28', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Application`
--
ALTER TABLE `Application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indices de la tabla `Candidate`
--
ALTER TABLE `Candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Company`
--
ALTER TABLE `Company`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Education`
--
ALTER TABLE `Education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indices de la tabla `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indices de la tabla `EmploymentType`
--
ALTER TABLE `EmploymentType`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Interview`
--
ALTER TABLE `Interview`
  ADD PRIMARY KEY (`id`),
  ADD KEY `application_id` (`application_id`),
  ADD KEY `interview_step_id` (`interview_step_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indices de la tabla `InterviewFlow`
--
ALTER TABLE `InterviewFlow`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `InterviewStep`
--
ALTER TABLE `InterviewStep`
  ADD PRIMARY KEY (`id`),
  ADD KEY `interview_flow_id` (`interview_flow_id`),
  ADD KEY `interview_type_id` (`interview_type_id`);

--
-- Indices de la tabla `InterviewType`
--
ALTER TABLE `InterviewType`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Position`
--
ALTER TABLE `Position`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `employment_type_id` (`employment_type_id`),
  ADD KEY `interview_flow_id` (`interview_flow_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indices de la tabla `PositionStatus`
--
ALTER TABLE `PositionStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Resume`
--
ALTER TABLE `Resume`
  ADD PRIMARY KEY (`id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- Indices de la tabla `WorkExperience`
--
ALTER TABLE `WorkExperience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `candidate_id` (`candidate_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Application`
--
ALTER TABLE `Application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Candidate`
--
ALTER TABLE `Candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Company`
--
ALTER TABLE `Company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Education`
--
ALTER TABLE `Education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Employee`
--
ALTER TABLE `Employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `EmploymentType`
--
ALTER TABLE `EmploymentType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Interview`
--
ALTER TABLE `Interview`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `InterviewFlow`
--
ALTER TABLE `InterviewFlow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `InterviewStep`
--
ALTER TABLE `InterviewStep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `InterviewType`
--
ALTER TABLE `InterviewType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Position`
--
ALTER TABLE `Position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `PositionStatus`
--
ALTER TABLE `PositionStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Resume`
--
ALTER TABLE `Resume`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `WorkExperience`
--
ALTER TABLE `WorkExperience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Application`
--
ALTER TABLE `Application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `Position` (`id`),
  ADD CONSTRAINT `application_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate` (`id`);

--
-- Filtros para la tabla `Education`
--
ALTER TABLE `Education`
  ADD CONSTRAINT `education_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate` (`id`);

--
-- Filtros para la tabla `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `Company` (`id`);

--
-- Filtros para la tabla `Interview`
--
ALTER TABLE `Interview`
  ADD CONSTRAINT `interview_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `Application` (`id`),
  ADD CONSTRAINT `interview_ibfk_2` FOREIGN KEY (`interview_step_id`) REFERENCES `InterviewStep` (`id`),
  ADD CONSTRAINT `interview_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`);

--
-- Filtros para la tabla `InterviewStep`
--
ALTER TABLE `InterviewStep`
  ADD CONSTRAINT `interviewstep_ibfk_1` FOREIGN KEY (`interview_flow_id`) REFERENCES `InterviewFlow` (`id`),
  ADD CONSTRAINT `interviewstep_ibfk_2` FOREIGN KEY (`interview_type_id`) REFERENCES `InterviewType` (`id`);

--
-- Filtros para la tabla `Position`
--
ALTER TABLE `Position`
  ADD CONSTRAINT `position_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `Company` (`id`),
  ADD CONSTRAINT `position_ibfk_2` FOREIGN KEY (`employment_type_id`) REFERENCES `EmploymentType` (`id`),
  ADD CONSTRAINT `position_ibfk_3` FOREIGN KEY (`interview_flow_id`) REFERENCES `InterviewFlow` (`id`),
  ADD CONSTRAINT `position_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `PositionStatus` (`id`);

--
-- Filtros para la tabla `Resume`
--
ALTER TABLE `Resume`
  ADD CONSTRAINT `resume_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate` (`id`);

--
-- Filtros para la tabla `WorkExperience`
--
ALTER TABLE `WorkExperience`
  ADD CONSTRAINT `workexperience_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `Candidate` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
