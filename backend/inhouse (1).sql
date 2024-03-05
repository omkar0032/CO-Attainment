-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2024 at 01:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inhouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `Serial No` int(11) NOT NULL,
  `Roll No` int(11) NOT NULL,
  `Seat No` varchar(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `UT1-Q1` int(11) DEFAULT NULL,
  `UT1-Q2` int(11) DEFAULT NULL,
  `UT2-Q1` int(11) DEFAULT NULL,
  `UT2-Q2` int(11) DEFAULT NULL,
  `UT3-Q1` int(11) DEFAULT NULL,
  `UT3-Q2` int(11) DEFAULT NULL,
  `UA` int(11) DEFAULT NULL,
  `Total-UT1` int(11) DEFAULT NULL,
  `Total-UT2` int(11) DEFAULT NULL,
  `Total-UT3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`Serial No`, `Roll No`, `Seat No`, `Name`, `UT1-Q1`, `UT1-Q2`, `UT2-Q1`, `UT2-Q2`, `UT3-Q1`, `UT3-Q2`, `UA`, `Total-UT1`, `Total-UT2`, `Total-UT3`) VALUES
(1, 33101, 'T190058501', 'BHY BHT', 5, 4, 4, 6, 5, 1, 59, NULL, NULL, NULL),
(2, 33102, 'T190058503', 'DVIT NIK', 6, 4, 3, 6, 5, 1, 44, NULL, NULL, NULL),
(3, 33103, 'T190058504', 'GRWL PRTHM SUNIL', 7, 4, 5, 9, 9, 8, 56, NULL, NULL, NULL),
(4, 33104, 'T190058507', 'NCHL JH', 10, 4, 8, 8, 8, 5, 61, NULL, NULL, NULL),
(5, 33105, 'T190058511', 'RYN GRWL', 10, 5, 5, 4, 9, 2, 67, NULL, NULL, NULL),
(6, 33106, 'T190058516', 'BHETI HIMNSHU PRG', 4, 6, 4, 8, 8, 6, 69, NULL, NULL, NULL),
(7, 33107, 'T190058517', 'BJJ NUSHREE SHRIGOPL', 10, 3, 5, 9, 5, 9, 77, NULL, NULL, NULL),
(8, 33108, 'T190058520', 'BRGE THRV VIJY', 2, 5, 2, 9, 4, 0, 52, NULL, NULL, NULL),
(9, 33109, 'T190058523', 'BVISKR NEHL SHNTRM', 5, 7, 0, 9, 9, 3, 61, NULL, NULL, NULL),
(10, 33110, 'T190058525', 'BELSRE VIDEHI GNESH', 7, 10, 0, 10, 6, 3, 54, NULL, NULL, NULL),
(11, 33111, 'T190058526', 'BHGT GURV SHNKR', 0, 8, 4, 9, 6, 0, 58, NULL, NULL, NULL),
(12, 33112, 'T190058529', 'BHRGV RUCHIT HEMKNT', 4, 4, 6, 2, 1, 1, 61, NULL, NULL, NULL),
(13, 33113, 'T190058533', 'BONDE PIYUSH RMESH', 5, 8, 4, 10, 7, 0, 57, NULL, NULL, NULL),
(14, 33114, 'T190058535', 'BUKNE NEERJ SUNIL', 5, 3, 3, 3, 6, 0, 46, NULL, NULL, NULL),
(15, 33115, 'T190058536', 'CHITNY PRSHNT DESHMUKH', 3, 2, 1, 2, 0, 0, 46, NULL, NULL, NULL),
(16, 33116, 'T190058539', 'CHUHN NISH TULSINGH', 4, 6, 2, 9, 9, 0, 66, NULL, NULL, NULL),
(17, 33117, 'T190058542', 'CHWHN HIMNSHU SHISH SINGH', 4, 4, 4, 9, 9, 0, 62, NULL, NULL, NULL),
(18, 33118, 'T190058544', 'CHILLL TNY RTINDR', 9, 6, 4, 9, 8, 0, 50, NULL, NULL, NULL),
(19, 33119, 'T190058545', 'CHOPDE YSH VIJY', 3, 6, 1, 9, 9, 0, 58, NULL, NULL, NULL),
(20, 33120, 'T190058548', 'DRSHN UDIKERI', 1, 8, 7, 8, 6, 1, 52, NULL, NULL, NULL),
(21, 33121, 'T190058552', 'DHKE MEY JY', 7, 5, 3, 8, 9, 6, 63, NULL, NULL, NULL),
(22, 33122, 'T190058554', 'DHVLE YSH YOGESH', 6, 5, 7, 10, 6, 7, 76, NULL, NULL, NULL),
(23, 33123, 'T190058556', 'DHUMNE SOHM SCHIN', 5, 5, 5, 3, 9, 2, 65, NULL, NULL, NULL),
(24, 33124, 'T190058559', 'ESH SHEKHR TLTHI', 7, 6, 5, 10, 5, 5, 72, NULL, NULL, NULL),
(25, 33125, 'T190058564', 'GWRI YSH LXMN', 8, 4, 4, 4, 9, 9, NULL, NULL, NULL, NULL),
(26, 33126, 'T190058566', 'GOKHLE SGR MHESH', 1, 5, 7, 6, 7, 3, 64, NULL, NULL, NULL),
(27, 33127, 'T190058567', 'GOLE PRTHMESH SNTOSH', 7, 5, 0, 10, 5, 0, 67, NULL, NULL, NULL),
(28, 33128, 'T190058571', 'GULECHH PRSHIL RJENDR', 8, 0, 5, 10, 5, 4, 59, NULL, NULL, NULL),
(29, 33129, 'T190058574', 'HIMNSHU MRTHE', 6, 3, 0, 10, 5, 0, 52, NULL, NULL, NULL),
(30, 33130, 'T190058576', 'HOLE SIDDHNT VIJY', 4, 10, 0, 1, 0, 0, 60, NULL, NULL, NULL),
(31, 33131, 'T190058579', 'HUSIN MOHMMED SHFQ', 8, 8, 4, 9, 4, 0, 40, NULL, NULL, NULL),
(32, 33132, 'T190058582', 'INGOLE KHILESH SOPN', 6, 10, 7, 10, 6, 10, 78, NULL, NULL, NULL),
(33, 33133, 'T190058585', 'JDHV VRUSHLI NNDLL', 4, 8, 5, 9, 4, 6, 60, NULL, NULL, NULL),
(34, 33134, 'T190058701', 'SMYK JIN', 5, 9, 0, 10, 4, 6, 75, NULL, NULL, NULL),
(35, 33135, 'T190058588', 'JMDDE DITY SHIVJI', 5, 3, 3, 6, 3, 3, 45, NULL, NULL, NULL),
(36, 33136, 'T190058592', 'KDM SHRUTI DNYNDEO', 7, 4, 4, 4, 5, 10, 58, NULL, NULL, NULL),
(37, 33137, 'T190058595', 'KLNTRI SNYOG SCHIN', 2, 8, 2, 3, 8, 3, 50, NULL, NULL, NULL),
(38, 33138, 'T190058598', 'KRNDE NIKIT HNMNT', 4, 0, 0, 10, 6, 2, 59, NULL, NULL, NULL),
(39, 33139, 'T190058602', 'KESKR ROHI VISHWS', 4, 6, 5, 9, 6, 5, 64, NULL, NULL, NULL),
(40, 33140, 'T190058604', 'KHDE TRUPTI TNJI', 5, 4, 1, 8, 5, 0, 61, NULL, NULL, NULL),
(41, 33141, 'T190058607', 'KHUDE PRTHMESH DTT', 2, 8, 0, 10, 6, 3, 48, NULL, NULL, NULL),
(42, 33142, 'T190058610', 'KITTD SNKET VITTHL', 6, 3, 2, 8, 8, 5, 59, NULL, NULL, NULL),
(43, 33143, 'T190058613', 'KOKTE SYLI BHUSHEB', 7, 4, 3, 8, 10, 6, 67, NULL, NULL, NULL),
(44, 33144, 'T190058617', 'KULKRNI POORV HEMNT', 8, 3, 2, 7, 10, 7, 72, NULL, NULL, NULL),
(45, 33145, 'T190058621', 'KULKRNI SOHM SUDHIR', 5, 3, 2, 8, 6, 8, 65, NULL, NULL, NULL),
(46, 33146, 'T190058624', 'KUMMET KSH REDDY', 5, 2, 3, 8, 3, 4, 42, NULL, NULL, NULL),
(47, 33147, 'T190058627', 'LNDE ROHIT UTTM', 3, 6, 0, 7, 6, 1, 59, NULL, NULL, NULL),
(48, 33148, 'T190058630', 'MHJN VIBHV NIVRUTTI', 5, 7, 3, 8, 5, 10, 72, NULL, NULL, NULL),
(49, 33149, 'T190058634', 'MLIK KHLID RZ RHBR', NULL, NULL, NULL, 8, 4, 2, 58, NULL, NULL, NULL),
(50, 33150, 'T190058637', 'MNE RJVRDHN MNGESH', 2, 5, 0, 10, 6, 0, 66, NULL, NULL, NULL),
(51, 33151, 'T190058642', 'MHTRE JINKY JIT', 4, 4, 2, 6, 5, 8, 51, NULL, NULL, NULL),
(52, 33152, 'T190058645', 'MOKSHD NVINCHNDR VIDY', 5, 7, 3, 9, 6, 5, 69, NULL, NULL, NULL),
(53, 33153, 'T190058648', 'NGRE THRV RJENDR', 7, 4, 4, 8, 4, 1, 79, NULL, NULL, NULL),
(54, 33154, 'T190058651', 'NRKHEDE MNDR MOHN', 4, 7, 7, 10, 6, 4, 64, NULL, NULL, NULL),
(55, 33155, 'T190058654', 'OM CHRY', 0, 7, 4, 6, 5, 6, 72, NULL, NULL, NULL),
(56, 33156, 'T190058657', 'PRMR VISHKH DGDUSING', 5, 6, 0, 9, 6, 3, 66, NULL, NULL, NULL),
(57, 33157, 'T190058660', 'PTIL BHUSHN VISHWSRO', NULL, NULL, NULL, 9, 3, 0, 56, NULL, NULL, NULL),
(58, 33158, 'T190058664', 'PTIL KRTIK TUSHR', 9, 7, 8, 8, 5, 8, 88, NULL, NULL, NULL),
(59, 33159, 'T190058667', 'PTIL SUJIT JGTRO', 5, 5, 0, 9, 5, 8, 43, NULL, NULL, NULL),
(60, 33160, 'T190058671', 'PWR OMKR REVNNTH', 5, 8, 8, 10, 10, 5, 69, NULL, NULL, NULL),
(61, 33161, 'T190058674', 'PENDSE RIY BHIJIT', 8, 7, 4, 9, 2, 7, 84, NULL, NULL, NULL),
(62, 33162, 'T190058677', 'PIYUSH MHESH TLEGONKR', 3, 3, 0, 10, 3, 4, 69, NULL, NULL, NULL),
(63, 33163, 'T190058680', 'PRBHUNE MN BHY', 6, 4, 0, 3, 4, 5, 66, NULL, NULL, NULL),
(64, 33165, 'T190058687', 'RHUL SNJY SKHRKR', 5, 10, 1, 8, 4, 4, 75, NULL, NULL, NULL),
(65, 33166, 'T190058691', 'RTHI GRIM SHRDKUMR', 9, 9, 7, 10, 5, 2, 88, NULL, NULL, NULL),
(66, 33167, 'T190058695', 'RITESH BHT', 4, 8, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(67, 33168, 'T190058698', 'SFIY MIN', 8, 7, 10, 9, 6, 3, 73, NULL, NULL, NULL),
(68, 33169, 'T190058587', 'JIN SMYK VIJY', 8, 7, 0, 7, 7, 0, 74, NULL, NULL, NULL),
(69, 33170, 'T190058703', 'SRTHK BINDL', 3, 9, 3, NULL, NULL, NULL, 66, NULL, NULL, NULL),
(70, 33171, 'T190058708', 'SYYED RMN QMR', 8, 7, 0, 9, 8, 4, 69, NULL, NULL, NULL),
(71, 33172, 'T190058711', 'SHH KUNJ CHIRG', 3, 3, 0, 9, 10, 0, 64, NULL, NULL, NULL),
(72, 33173, 'T190058714', 'SHELR SHUBHM DILIP', NULL, NULL, NULL, 10, 9, 0, 85, NULL, NULL, NULL),
(73, 33174, 'T190058718', 'SHETH SOHM RHUL', 0, 2, 2, 3, 9, 2, 73, NULL, NULL, NULL),
(74, 33175, 'T190058721', 'SHINDE SUMITR KUNDLIK', 2, 4, 8, 8, 6, 5, 61, NULL, NULL, NULL),
(75, 33176, 'T190058725', 'SONWNE PRTIK RVINDR', 4, 10, 5, 10, 6, 4, 76, NULL, NULL, NULL),
(76, 33177, 'T190058730', 'SURVSE ROHN SUHS', 9, 10, 4, 10, 9, 7, 86, NULL, NULL, NULL),
(77, 33178, 'T190058734', 'TKLIKR GURI SUNIL', 9, 4, 4, 6, 7, 2, 62, NULL, NULL, NULL),
(78, 33179, 'T190058738', 'THKUR YSHRJ SNJY', 3, 4, 5, 4, 7, 0, 61, NULL, NULL, NULL),
(79, 33180, 'T190058742', 'VSTE BLJI NMDEO', 0, 3, 5, 10, 9, 2, 64, NULL, NULL, NULL),
(80, 33181, 'T190058745', 'WDEKR OMKR SHRIRM', 3, 5, 3, 10, 6, 4, 75, NULL, NULL, NULL),
(81, 33182, 'T190058749', 'WGHMRE HRSH GNESH', 3, 7, 1, 10, 8, 3, 63, NULL, NULL, NULL),
(82, 33183, 'T190058752', 'YCHWD MNSI TNJI', 8, 5, 5, 9, 8, 2, 68, NULL, NULL, NULL),
(83, 33201, 'T190058502', 'DITY RJENDR THORT', 9, 9, 7, 10, 6, 8, 59, NULL, NULL, NULL),
(84, 33202, 'T190058505', 'GRWL VISHNVI MYURESH', 6, 5, 5, 10, 10, 0, 67, NULL, NULL, NULL),
(85, 33203, 'T190058506', 'MBEKR TEJS MUKUND', 9, 9, 5, 10, 6, 4, 71, NULL, NULL, NULL),
(86, 33204, 'T190058509', 'NUSHK DE', 8, 9, 5, 10, 10, 4, 72, NULL, NULL, NULL),
(87, 33205, 'T190058515', 'WD MITREY DEEPK', 6, 8, 3, 10, 6, 0, 54, NULL, NULL, NULL),
(88, 33206, 'T190058518', 'BNDL DWIT BHIJIT', 4, 10, 3, 10, 6, 0, 59, NULL, NULL, NULL),
(89, 33207, 'T190058519', 'BPECH PURV MHESH', 10, 10, 5, 8, 6, 3, 68, NULL, NULL, NULL),
(90, 33208, 'T190058521', 'BRGE PRESH PURUSHOTTM', 5, 9, 5, 10, 0, 5, 62, NULL, NULL, NULL),
(91, 33209, 'T190058524', 'BEDMUTH DEVESH SNDEEP', 5, 9, 10, 10, 10, 6, 81, NULL, NULL, NULL),
(92, 33210, 'T190058527', 'BHIK YSHRJ SNJY', 3, 7, 5, 10, 6, 0, NULL, NULL, NULL, NULL),
(93, 33211, 'T190058528', 'BHNDRI DRSHNKUMR NRENDR', 6, 10, 4, 8, 6, 0, 58, NULL, NULL, NULL),
(94, 33212, 'T190058531', 'BHVSR SKSHI GHNSHYM', 4, 9, 9, 3, 10, 10, 59, NULL, NULL, NULL),
(95, 33213, 'T190058534', 'BOR PIYUSH RHUL', 6, 5, 10, 10, 10, 4, 60, NULL, NULL, NULL),
(96, 33214, 'T190058537', 'CHNDK YSHSHREE KILSH', 6, 9, 6, 9, 10, 1, 61, NULL, NULL, NULL),
(97, 33215, 'T190058538', 'CHUDHRI HRSH NIL', 9, 10, 5, 8, 6, 8, 82, NULL, NULL, NULL),
(98, 33216, 'T190058540', 'CHURE DIGMBR LXMN', 5, 9, 5, 10, 10, 4, 54, NULL, NULL, NULL),
(99, 33217, 'T190058543', 'CHENDKE SYLI PRSHNT', 10, 9, 3, 10, 10, 2, 60, NULL, NULL, NULL),
(100, 33218, 'T190058546', 'DLVI MR RVINDR', 4, 3, 0, 8, 4, 4, 62, NULL, NULL, NULL),
(101, 33219, 'T190058547', 'DMNI NMN HITESH', 5, 7, 3, 10, 4, 4, 53, NULL, NULL, NULL),
(102, 33220, 'T190058549', 'DTEY MEHER PRKSH', 5, 9, 5, NULL, NULL, NULL, 48, NULL, NULL, NULL),
(103, 33221, 'T190058553', 'DHRMDHIKRI CHINMYEE SHRIKNT', 5, 10, 5, 9, 8, 4, 46, NULL, NULL, NULL),
(104, 33222, 'T190058557', 'DODI RONK', 6, 7, 5, 10, 6, 1, 54, NULL, NULL, NULL),
(105, 33223, 'T190058558', 'DOLS SNDESH DHNNJY', 3, 0, 5, 2, 2, 2, 49, NULL, NULL, NULL),
(106, 33224, 'T190058560', 'GBHLE PRTIK RMDS', 8, 5, 5, 10, 10, 2, 59, NULL, NULL, NULL),
(107, 33225, 'T190058565', 'GHODKE MRUNLI MHDEV', 10, 6, 5, 10, 6, 4, 62, NULL, NULL, NULL),
(108, 33226, 'T190058568', 'GONDNE TEJSWINI JYNT', 6, 8, 5, 10, 10, 1, 54, NULL, NULL, NULL),
(109, 33227, 'T190058570', 'GOREGONKR TNMY DEEPK', 10, 0, 5, 10, 5, 2, 62, NULL, NULL, NULL),
(110, 33228, 'T190058572', 'GUPT YUSH JITENDR', 7, 8, 1, 4, 8, 0, 50, NULL, NULL, NULL),
(111, 33229, 'T190058575', 'HINGE SHLOK NIVRUTTI', 10, 4, 10, 8, 8, 0, 67, NULL, NULL, NULL),
(112, 33230, 'T190058580', 'INMDR MIHIR SNJEEV', 6, 4, 5, 4, 6, 4, NULL, NULL, NULL, NULL),
(113, 33231, 'T190058581', 'INGLE BHIJEET BHGWN', 10, 9, 10, 10, 10, 4, 61, NULL, NULL, NULL),
(114, 33232, 'T190058583', 'JDHV BHISHEK PURUSHOTTM', 10, 10, 2, 10, 6, 8, 71, NULL, NULL, NULL),
(115, 33233, 'T190058586', 'JGDLE SHRUTI SURESH', 5, 7, 0, NULL, NULL, NULL, 54, NULL, NULL, NULL),
(116, 33234, 'T190058590', 'JOSHI SNIK MNDR', 9, 5, 10, 6, 6, 0, 57, NULL, NULL, NULL),
(117, 33235, 'T190058591', 'KCHRE KUNL MHENDR', 7, 5, 5, 10, 6, 0, 54, NULL, NULL, NULL),
(118, 33236, 'T190058593', 'KDM SMIT SUNIL', 6, 6, 5, 1, 6, 0, NULL, NULL, NULL, NULL),
(119, 33237, 'T190058596', 'KLYNI SHOK NILPNKR', 7, 8, 3, 10, 6, 0, 68, NULL, NULL, NULL),
(120, 33238, 'T190058599', 'KSHID MRUNL BHRT', 3, 1, 0, 10, 0, 10, 43, NULL, NULL, NULL),
(121, 33239, 'T190058603', 'KHDE OMKR SHNKR', 8, 9, 6, 10, 2, 10, 70, NULL, NULL, NULL),
(122, 33240, 'T190058605', 'KHLID SMI QUDRI HMED MTI QUDRI', 5, 10, 3, 8, 6, 2, 64, NULL, NULL, NULL),
(123, 33241, 'T190058608', 'KINIKR THRV PRDEEPRO', 5, 7, 5, 7, 6, 6, 71, NULL, NULL, NULL),
(124, 33242, 'T190058611', 'KOGNUR KSHY SHOK', 10, 10, 5, 10, 9, 2, 57, NULL, NULL, NULL),
(125, 33243, 'T190058614', 'KOTHRI SHIL CHETN', 6, 5, 5, 8, 8, 4, 56, NULL, NULL, NULL),
(126, 33244, 'T190058618', 'KULKRNI THRV MDN', 6, 10, 6, 10, 6, 0, 67, NULL, NULL, NULL),
(127, 33245, 'T190058622', 'KULKRNI UMKNT SNJY', 3, 0, 2, 2, 2, 0, 47, NULL, NULL, NULL),
(128, 33246, 'T190058625', 'KUMTHEKR TNISH DINESH', 8, 10, 5, 9, 8, 3, 60, NULL, NULL, NULL),
(129, 33247, 'T190058628', 'LOHN NEESH DEEPK', 6, 4, 4, 10, 6, 0, NULL, NULL, NULL, NULL),
(130, 33248, 'T190058631', 'MHRNVR VINSH LXMN', 5, 8, 8, 6, 0, 6, 63, NULL, NULL, NULL),
(131, 33249, 'T190058635', 'MNSI SHRD BLGUDE', 10, 4, 9, 10, 10, 7, 74, NULL, NULL, NULL),
(132, 33250, 'T190058640', 'MVNI RJ SURESH', 10, 9, 9, 10, 10, 4, 73, NULL, NULL, NULL),
(133, 33251, 'T190058643', 'MISL PRNJL RJESH', 3, 10, 10, 10, 10, 4, 64, NULL, NULL, NULL),
(134, 33252, 'T190058646', 'MULL MHEK NJIR', 8, 10, 6, 9, 5, 10, 71, NULL, NULL, NULL),
(135, 33253, 'T190058649', 'NGMOTI THRV SHSHIKNT', 10, 7, 3, 10, 10, 0, 77, NULL, NULL, NULL),
(136, 33254, 'T190058652', 'NWNDR GURI SNJY', 7, 7, 6, 10, 10, 4, 71, NULL, NULL, NULL),
(137, 33255, 'T190058655', 'OSWL BHVESH MUKESH', 10, 9, 8, 10, 8, 4, 80, NULL, NULL, NULL),
(138, 33256, 'T190058658', 'PTIL DITY POPT', 9, 10, 8, 10, 10, 2, 82, NULL, NULL, NULL),
(139, 33257, 'T190058662', 'PTIL INDRJIT RNJIT', 8, 10, 7, 10, 10, 2, 78, NULL, NULL, NULL),
(140, 33258, 'T190058665', 'PTIL SGR PREMCHND', 9, 10, 5, 10, 10, 4, 73, NULL, NULL, NULL),
(141, 33259, 'T190058668', 'PTIL VEDNT HNUMNT', 4, 9, 5, NULL, NULL, NULL, 68, NULL, NULL, NULL),
(142, 33260, 'T190058672', 'PWR SHRDDH UCHIT', 9, 7, 7, 10, 2, 10, 66, NULL, NULL, NULL),
(143, 33261, 'T190058675', 'PHUTNE GURI BHIJIT', 10, 8, 7, 8, 0, 10, 67, NULL, NULL, NULL),
(144, 33262, 'T190058678', 'POKHRN DITY RHUL', 6, 8, 4, 8, 6, 8, 61, NULL, NULL, NULL),
(145, 33263, 'T190058682', 'PRNV KOTHWDE', 1, 8, 3, 9, 4, 0, 70, NULL, NULL, NULL),
(146, 33264, 'T190058685', 'PRSHNT CHNDRKNT PTIL', NULL, NULL, NULL, 10, 8, 4, 78, NULL, NULL, NULL),
(147, 33265, 'T190058689', 'RJPTHK MIHIR TUSHR', 3, 2, 2, 9, 4, 0, 53, NULL, NULL, NULL),
(148, 33266, 'T190058692', 'RUT MNISH SHNKR', 7, 8, 6, 10, 6, 8, 70, NULL, NULL, NULL),
(149, 33267, 'T190058696', 'ROHN JDHV', 9, 4, 4, 10, 9, 2, 59, NULL, NULL, NULL),
(150, 33268, 'T190058699', 'SKURE GYTRI VIJY', 9, 7, 9, 10, 10, 3, 73, NULL, NULL, NULL),
(151, 33269, 'T190058704', 'STGHRE SHSHNK CHNDRBHN', 0, 2, 2, 6, 6, 0, 64, NULL, NULL, NULL),
(152, 33270, 'T190058709', 'SHH CHERIL YOGESH', 9, 8, 3, 10, 4, 2, 71, NULL, NULL, NULL),
(153, 33271, 'T190058712', 'SHHRE TITIKSH SUNIL', 8, 4, 5, 10, 9, 4, 72, NULL, NULL, NULL),
(154, 33272, 'T190058715', 'SHELOKR NUPUR MHENDR', 7, 4, 5, 9, 9, 8, 82, NULL, NULL, NULL),
(155, 33273, 'T190058719', 'SHETTI SHREY SHRIDHR', 8, 6, 8, 10, 10, 8, 87, NULL, NULL, NULL),
(156, 33274, 'T190058722', 'SHREYS BBN ZGRE', 2, 8, 4, 10, 4, 10, 65, NULL, NULL, NULL),
(157, 33275, 'T190058727', 'SONWNE YSH SURENDR', 7, 8, 4, 10, 6, 2, 64, NULL, NULL, NULL),
(158, 33276, 'T190058731', 'SURWSE PRSHNT RMKISHN', 7, 6, 9, 4, 4, 8, 76, NULL, NULL, NULL),
(159, 33277, 'T190058736', 'TENDULKR TNVI SNDEEP', 8, 9, 7, 10, 10, 4, 83, NULL, NULL, NULL),
(160, 33278, 'T190058739', 'UNECH PRSD MHENDR', 8, 6, 4, NULL, NULL, NULL, 70, NULL, NULL, NULL),
(161, 33279, 'T190058743', 'VERM HRISH RJENDRPRSD', 9, 10, 6, 10, 10, 4, 79, NULL, NULL, NULL),
(162, 33280, 'T190058746', 'WDHW CHNCHL RJESH', 9, 6, 9, 10, 6, 0, 80, NULL, NULL, NULL),
(163, 33281, 'T190058750', 'WNI PLSH PRESH', 7, 6, 7, 4, 6, 10, 78, NULL, NULL, NULL),
(164, 33282, 'T190058753', 'YELGULWR MNSI KVIRJ', NULL, NULL, NULL, 8, 8, 4, 58, NULL, NULL, NULL),
(165, 33301, 'T190058510', 'POORVRJ VIKS LONDHE', 4, 8, 3, 7, 6, 3, 49, NULL, NULL, NULL),
(166, 33302, 'T190058512', 'RYN MHENDR VOR', 4, 10, 5, 9, 8, 6, 75, NULL, NULL, NULL),
(167, 33303, 'T190058513', 'THRV STYENDR GRWL', 9, 10, 4, 10, 6, 4, 80, NULL, NULL, NULL),
(168, 33304, 'T190058514', 'TTRDE SKSHI RJENDR', 1, 10, 4, 8, 6, 0, 61, NULL, NULL, NULL),
(169, 33305, 'T190058522', 'BRHTE HEMNG MILIND', 9, 5, 3, 10, 5, 0, 56, NULL, NULL, NULL),
(170, 33306, 'T190058532', 'BIRJDR SHUTOSH SNDIP', 10, 6, 4, 9, 3, 0, 51, NULL, NULL, NULL),
(171, 33307, 'T190058541', 'CHVN SIDDHNT NRENDR', 4, 4, 4, 8, 4, 0, 58, NULL, NULL, NULL),
(172, 33308, 'T190058550', 'DESHMUKH VISHNVI MBDS', 7, 4, 5, 10, 6, 1, 64, NULL, NULL, NULL),
(173, 33309, 'T190058551', 'DESHPNDE SRTHK PRSD', 7, 4, 5, 5, 3, 0, 56, NULL, NULL, NULL),
(174, 33310, 'T190058555', 'DHINGE SIDDHESH VINSH', 10, 8, 8, 10, 6, 0, 64, NULL, NULL, NULL),
(175, 33311, 'T190058561', 'GJLWR YSH PHULCHND', 9, 6, 3, 6, 0, 0, 69, NULL, NULL, NULL),
(176, 33312, 'T190058563', 'GVITRE YSH SNJY', 6, 8, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(177, 33313, 'T190058569', 'GOREGONKR PURV PRDIP', 7, 3, 4, 4, 0, 0, NULL, NULL, NULL, NULL),
(178, 33314, 'T190058573', 'HRSH RNJNE', 7, 3, 5, 8, 5, 1, 48, NULL, NULL, NULL),
(179, 33315, 'T190058578', 'HON SNEHL DDSHEB', 10, 10, 5, 9, 4, 0, 65, NULL, NULL, NULL),
(180, 33316, 'T190058584', 'JDHV PRTIK SUBHSH', 4, 3, 3, 1, 6, 5, 50, NULL, NULL, NULL),
(181, 33317, 'T190058615', 'JYESH VINOD KOWLE', 5, 10, 4, 9, 6, 0, 70, NULL, NULL, NULL),
(182, 33318, 'T190058589', 'JETHR DIPLEE KILS', NULL, NULL, NULL, 4, 6, 0, NULL, NULL, NULL, NULL),
(183, 33319, 'T190058594', 'KDM VRDRJ SNJY', 8, 3, 7, 7, 4, 0, 56, NULL, NULL, NULL),
(184, 33320, 'T190058707', 'KLEKR SVNI PRVIN', 0, 8, 4, 9, 6, 1, 66, NULL, NULL, NULL),
(185, 33321, 'T190058597', 'KMBLE SHRINESH SHNKR', 7, 3, 6, 0, 7, 0, 52, NULL, NULL, NULL),
(186, 33322, 'T190058600', 'KTRUWR NUJ RJESHWR', 7, 8, 4, 8, 9, 0, 64, NULL, NULL, NULL),
(187, 33323, 'T190058601', 'KWLE SUMIT UTTMRO', 9, 6, 0, 9, 6, 0, 52, NULL, NULL, NULL),
(188, 33324, 'T190058606', 'KHILRI SEJL SCHIN', 10, 6, 7, 8, 7, 0, 70, NULL, NULL, NULL),
(189, 33325, 'T190058609', 'KIRN PCHRNE', 9, 2, 3, 7, 7, 0, 46, NULL, NULL, NULL),
(190, 33326, 'T190058612', 'KOKJE SUYOG GJNN', 8, 4, 5, 1, 3, 1, 65, NULL, NULL, NULL),
(191, 33327, 'T190058616', 'KSHTRIY MNS RJESH', 9, 4, 5, 5, 2, 0, 60, NULL, NULL, NULL),
(192, 33328, 'T190058619', 'KULKRNI HRIPRIY SHRIRM', NULL, NULL, NULL, 5, 6, 0, 68, NULL, NULL, NULL),
(193, 33329, 'T190058620', 'KULKRNI ROHIT BHIJIT', 9, 6, 4, 4, 5, 0, 71, NULL, NULL, NULL),
(194, 33330, 'T190058623', 'KULKRNI VEDNT DTTTRY', 8, 4, 6, 2, 4, 0, 64, NULL, NULL, NULL),
(195, 33331, 'T190058626', 'KUSHL BHTTD', 9, 3, 6, 3, 7, 5, 76, NULL, NULL, NULL),
(196, 33332, 'T190058629', 'LONGDGE UDY NIL', 5, 6, 4, 6, 6, 0, 61, NULL, NULL, NULL),
(197, 33333, 'T190058632', 'MHURKR NNDINI SMIR', 9, 3, 4, 4, 5, 0, 64, NULL, NULL, NULL),
(198, 33334, 'T190058633', 'MJUMDR SNDEEP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(199, 33335, 'T190058636', 'MNDR MHESH DESHMUKH', 5, 3, 5, 5, 8, 1, 52, NULL, NULL, NULL),
(200, 33336, 'T190058638', 'MNPREET KUR HRNEET SINGH SIDHU', 5, 5, 2, 3, 0, 0, 56, NULL, NULL, NULL),
(201, 33337, 'T190058639', 'MRTHE SNDESH DTTTRY', 5, 10, 8, 9, 4, 0, 69, NULL, NULL, NULL),
(202, 33338, 'T190058641', 'MHSKR GRGI SUHS', 3, 5, 6, 8, 7, 0, 68, NULL, NULL, NULL),
(203, 33339, 'T190058644', 'MITKR PRTHMESH JGDISH', NULL, NULL, NULL, 9, 1, 3, 50, NULL, NULL, NULL),
(204, 33340, 'T190058508', 'MOHMMD SIF SHKEEL HMD NSRI', 8, 8, 8, 9, 6, 4, 77, NULL, NULL, NULL),
(205, 33341, 'T190058647', 'NGNE KUNL KILS', 6, 5, 1, 9, 1, 3, 70, NULL, NULL, NULL),
(206, 33342, 'T190058650', 'NIK KUSHIK NITIN', 8, 10, 7, 10, 6, 0, 68, NULL, NULL, NULL),
(207, 33343, 'T190058653', 'OLEKR VIJY DEMJI', 6, 8, 7, 7, 6, 0, 56, NULL, NULL, NULL),
(208, 33344, 'T190058656', 'PRKLE PRNV PNDURNG', NULL, NULL, NULL, 7, 4, 1, 66, NULL, NULL, NULL),
(209, 33345, 'T190058659', 'PTIL NURG DEEPK', 4, 4, 6, 10, 7, 1, 72, NULL, NULL, NULL),
(210, 33346, 'T190058661', 'PTIL HRSHVRDHN NISHIKNT', 8, 8, 9, 9, 10, 9, 84, NULL, NULL, NULL),
(211, 33347, 'T190058663', 'PTIL ISH JYWNT', 8, 3, 4, 5, 0, 9, 50, NULL, NULL, NULL),
(212, 33348, 'T190058666', 'PTIL SNIK BHGWN', 8, 0, 7, 2, 3, 7, 50, NULL, NULL, NULL),
(213, 33349, 'T190058669', 'PTIL YSH PRSHRM', 6, 8, 6, 10, 9, 10, 83, NULL, NULL, NULL),
(214, 33350, 'T190058670', 'PWR MIR DIPK', 4, 2, 6, 8, 3, 7, NULL, NULL, NULL, NULL),
(215, 33351, 'T190058673', 'PWR VISHVM JGDISH', 8, 8, 4, 6, 3, 9, 64, NULL, NULL, NULL),
(216, 33352, 'T190058676', 'PITLE SHUBHM DINESH', 9, 10, 1, 10, 6, 0, 68, NULL, NULL, NULL),
(217, 33353, 'T190058679', 'POL NEH SNJY', 9, 4, 7, 9, 3, 6, 65, NULL, NULL, NULL),
(218, 33354, 'T190058681', 'PRDHN PRTIK NNSHEB', 10, 8, 8, 10, 10, 5, 83, NULL, NULL, NULL),
(219, 33355, 'T190058683', 'PRNV SURYKIRN WGHNN', 4, 6, 2, 8, 8, 1, 56, NULL, NULL, NULL),
(220, 33356, 'T190058686', 'PRTIK SUNIL DHNE', 5, 10, 0, 7, 4, 7, 76, NULL, NULL, NULL),
(221, 33357, 'T190058688', 'RJ OMPRKSH GNDOLE', 10, 9, 8, 9, 9, 8, 74, NULL, NULL, NULL),
(222, 33358, 'T190058690', 'RJPUT RUTURJSINGH RVINDRSINGH', 9, 4, 4, 2, 7, 3, 45, NULL, NULL, NULL),
(223, 33359, 'T190058693', 'RUT PRTH VIJY', 9, 6, 3, 7, 8, 0, 73, NULL, NULL, NULL),
(224, 33360, 'T190058697', 'SBLE GURV PRMOD', 10, 8, 1, 9, 10, 0, 87, NULL, NULL, NULL),
(225, 33361, 'T190058700', 'SLUNKE DHNNJY BHGWN', 2, 6, 4, 10, 7, 0, 66, NULL, NULL, NULL),
(226, 33362, 'T190058702', 'SRD YSH VINOD', 5, 8, 3, 9, 8, 1, 73, NULL, NULL, NULL),
(227, 33363, 'T190058706', 'SURV MOHNTY', 4, 8, 3, 9, 6, 0, 68, NULL, NULL, NULL),
(228, 33364, 'T190058710', 'SHH KHUSHI DINESH', 0, 8, 0, 3, 6, 0, 75, NULL, NULL, NULL),
(229, 33365, 'T190058713', 'SHIKH SIFUDDIN NZIMUDDIN', 1, 8, 4, 9, 6, 1, 72, NULL, NULL, NULL),
(230, 33366, 'T190058716', 'SHERE VISHL RJKUMR', 9, 2, 2, 10, 7, 0, 78, NULL, NULL, NULL),
(231, 33367, 'T190058717', 'SHETE TEJS VISHWJIT', 6, 7, 2, 9, 10, 0, 78, NULL, NULL, NULL),
(232, 33368, 'T190058720', 'SHEWLKR DITY SHILESH', 8, 6, 4, 9, 6, 2, 82, NULL, NULL, NULL),
(233, 33369, 'T190058723', 'SINGH NURG PRMOD', NULL, NULL, NULL, 7, 6, 6, 63, NULL, NULL, NULL),
(234, 33370, 'T190058728', 'SUGNDH SRVESH RMESH', 5, 7, 0, 9, 6, 0, 54, NULL, NULL, NULL),
(235, 33371, 'T190058729', 'SUKUM SHUBHM GNESH', 8, 4, 4, 5, 6, 7, 57, NULL, NULL, NULL),
(236, 33372, 'T190058732', 'SURYVNSHI RISHIKESH HRISH', 8, 2, 2, 1, 5, 7, 45, NULL, NULL, NULL),
(237, 33373, 'T190058733', 'SWMI ONKR BNDU', 8, 3, 6, 10, 10, 5, 75, NULL, NULL, NULL),
(238, 33374, 'T190058735', 'TNMY BONDE', 9, 1, 5, 9, 10, 4, 69, NULL, NULL, NULL),
(239, 33375, 'T190058737', 'THKUR NIKET SNJYSING', 6, 8, 4, 8, 6, 0, 54, NULL, NULL, NULL),
(240, 33376, 'T190058740', 'VIDY SHRIDHR NIL', 4, 10, 0, 10, 8, 0, 81, NULL, NULL, NULL),
(241, 33377, 'T190058741', 'VSVE KNKSH JOLU', 10, 6, 1, 10, 4, 0, 44, NULL, NULL, NULL),
(242, 33378, 'T190058744', 'VIRJ PRVIN BHUKTE', 1, 7, 4, 7, 6, 0, 56, NULL, NULL, NULL),
(243, 33379, 'T190058747', 'WDKR DITY NND', 10, 10, 4, 10, 10, 5, 73, NULL, NULL, NULL),
(244, 33380, 'T190058748', 'WGH RUGVED NIL', 6, 8, 1, 3, 2, 4, 35, NULL, NULL, NULL),
(245, 33381, 'T190058751', 'WRKE PRNISH PRSHNT', 9, 6, 1, 7, 5, 3, 62, NULL, NULL, NULL),
(246, 33382, 'T190058754', 'ZOTING PRJWL GIRIDHR', 4, 4, 4, 5, 5, 1, 52, NULL, NULL, NULL),
(247, 33383, 'T190058530', 'BHRML KUSTUBH DEEPK', 3, 6, 3, NULL, NULL, NULL, 42, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
