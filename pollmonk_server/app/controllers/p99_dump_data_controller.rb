class P99DumpDataController < ApplicationController
 
	skip_before_action :verify_authenticity_token
 
	def insert_data

		sql = "insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (1, 1, 1, 'Very Satisified', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (2, 1, 1, 'Some What Satisified', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (3, 1, 1, 'Some What Dissatisified', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (4, 1, 1, 'Neither Satisified Nor Dissatisified', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (5, 1, 1, 'Very Dissatisified', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (6, 2, 1, 'Very Easy', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (7, 2, 1, 'Some What Easy', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (8, 2, 1, 'Some What Difficult', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (9, 2, 1, 'Neither Easy Nor Difficult', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (10, 2, 1, 'Very Difficult', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (11, 3, 1, 'Extermely Convenient', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (12, 3, 1, 'Very Convenient', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (13, 3, 1, 'Not So Convenient', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (14, 3, 1, 'Some What Convenient', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (15, 3, 1, 'Not At All Convenient', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (16, 4, 1, 'Extermely Convenient', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (17, 4, 1, 'Very Convenient', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (18, 4, 1, 'Not So Convenient', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (19, 4, 1, 'Some What Convenient', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (20, 4, 1, 'Not At All Convenient', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (21, 5, 1, 'Excellent', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (22, 5, 1, 'Fair', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (23, 5, 1, 'Very Good', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (24, 5, 1, 'Good', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (25, 5, 1, 'Poor', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (26, 6, 1, 'Extermely Comfortable', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (27, 6, 1, 'Very Comfortable', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (28, 6, 1, 'Not So Comfortable', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (29, 6, 1, 'Some What Comfortable', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (30, 6, 1, 'Not At All Comfortable', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (31, 7, 2, 'Not At All', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (32, 7, 2, 'A Few Hours of the Day', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (33, 7, 2, 'Most of the Day', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (34, 7, 2, 'All Day', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (35, 7, 2, 'Not At All', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (36, 8, 2, 'A Few Hours of the Day', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (37, 8, 2, 'Most of the Day', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (38, 8, 2, 'All Day', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (39, 8, 2, 'Not At All', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (40, 9, 2, 'A Few Hours of the Day', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (41, 9, 2, 'Most of the Day', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (42, 9, 2, 'All Day', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (43, 9, 2, 'Not At All', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (44, 10, 2, 'A Few Hours of the Day', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (45, 10, 2, 'Most of the Day', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (46, 10, 2, 'All Day', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (47, 10, 2, 'Not At All', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (48, 11, 2, 'A Few Hours of the Day', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (49, 11, 2, 'Most of the Day', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (50, 11, 2, 'All Day', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (51, 11, 2, 'Not At All', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (52, 12, 2, 'A Few Hours of the Day', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (53, 12, 2, 'Most of the Day', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (54, 12, 2, 'All Day', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (55, 12, 2, 'Not At All', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (56, 13, 3, 'Extermely Easy', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (57, 13, 3, 'Very Easy', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (58, 13, 3, 'Moderately Easy', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (59, 13, 3, 'Slightly Easy', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (60, 13, 3, 'Not At All Easy', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (61, 14, 3, 'Extermely Happy', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (62, 14, 3, 'Very Happy', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (63, 14, 3, 'Moderately Happy', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (64, 14, 3, 'Slightly Happy', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (65, 14, 3, 'Not At All Happy', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (66, 15, 3,'Extermely Easy', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (67, 15, 3,'Very Easy', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (68, 15, 3,'Moderately Easy', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (69, 15, 3,'Slightly Easy', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (70, 15, 3,'Not At All Easy', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (71, 16, 3,'Extermely Quickly', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (72, 16, 3,'Very Quickly', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (73, 16, 3,'Moderately Quickly', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (74, 16, 3,'Slightly Quickly', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (75, 16, 3,'Not At All Quickly', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (76, 17, 3,'Extermely Happy', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (77, 17, 3,'Very Happy', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (78, 17, 3,'Moderately Happy', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (79, 17, 3,'Slightly Happy', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (80, 17, 3,'Not At All Happy', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (81, 18, 4,'Extermely Easy', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (82, 18, 4,'Very Easy', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (83, 18, 4,'Moderately Easy', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (84, 18, 4,'Slightly Easy', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (85, 18, 4,'Not At All Easy', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (86, 19, 4, 'Extermely Often', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (87, 19, 4, 'Very Often', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (88, 19, 4, 'Moderately Often', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (89, 19, 4, 'Slightly Often', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (90, 19, 4, 'Not At All Often', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (91, 20, 4,'Extermely Responsive', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (92, 20, 4,'Very Responsive', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (93, 20, 4,'Moderately Responsive', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (94, 20, 4,'Slightly Responsive', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (95, 20, 4,'Not At All Responsive', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (96, 21, 4,'Extermely Considerate', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (97, 21, 4,'Very Considerate', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (98, 21, 4,'Moderately Considerate', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (99, 21, 4,'Slightly Considerate', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (100, 21, 4,'Not At All Considerate', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (101, 22, 4,'Extermely Professionally', 5, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (102, 22, 4,'Very Professionally', 4, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (103, 22, 4,'Moderately Professionally', 3, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (104, 22, 4,'Slightly Professionally', 2, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
insert into p12_mm_template_c2s( id, template_q_id, template_id, grade, points, created_at, updated_at) VALUES (105, 22, 4,'Not At All Professionally', 1, '04-DEC-18 10.45.56.298825000 PM', '04-DEC-18 10.45.56.298825000 PM');
"
		
		ActiveRecord::Base.connection.execute(sql)
		
		render json: {status: 'SUCCESS', message: 'INSERT SUCCESS', data: ''}, status: :ok
	end
end
